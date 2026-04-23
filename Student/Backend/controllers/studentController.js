import { Students } from "../models/studentModel.js"; // ✅ match ho gaya

export const createStudent = async (req, res) => {
  try {
    const { name, age, email, course, fees } = req.body;

    if (!name || !age || !email || !course || !fees) {
      return res.status(400).json({ status: false, message: "All fields required" });
    }

    const exist = await Student.findOne({ email });
    if (exist) {
      return res.status(400).json({ status: false, message: "Email already exists" });
    }

    const student = await Student.create(req.body);

    res.json({ status: true, message: "Student created", data: student });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const bulkStudents = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ status: false, message: "Send array only" });
    }

    for (let item of req.body) {
      if (!item.name || !item.age || !item.email || !item.course || !item.fees) {
        return res.status(400).json({ status: false, message: "Missing fields in bulk data" });
      }
    }

    const data = await Student.insertMany(req.body);

    res.json({ status: true, message: "Bulk insert success", data });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    let { search, sortBy = "createdAt", order = "asc", page = 1, limit = 5, minFees, maxFees } = req.query;

    let query = {};

    // 🔍 Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { course: { $regex: search, $options: "i" } },
      ];
    }

    // 💰 Fees Filter
    if (minFees || maxFees) {
      query.fees = {};
      if (minFees) query.fees.$gte = minFees;
      if (maxFees) query.fees.$lte = maxFees;
    }

    // 📊 Sorting
    let sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const total = await Student.countDocuments(query);

    const students = await Student.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      status: true,
      data: students,
      pagination: {
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        perPage: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ status: false, message: "Student not found" });
    }

    const updated = await Student.findByIdAndUpdate(id, req.body, { new: true });

    res.json({ status: true, message: "Updated", data: updated });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const patchStudent = async (req, res) => {
  try {
    const allowed = ["fees", "status"];

    const updates = Object.keys(req.body);
    const isValid = updates.every((key) => allowed.includes(key));

    if (!isValid) {
      return res.status(400).json({ status: false, message: "Invalid fields" });
    }

    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ status: true, message: "Patched", data: updated });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { status: "inactive" });

    res.json({ status: true, message: "Student deleted (soft)" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};



export const countByCourse = async (req, res) => {
  try {
    const data = await Student.aggregate([
      { $group: { _id: "$course", count: { $sum: 1 } } },
    ]);

    let result = {};
    data.forEach((item) => {
      result[item._id] = item.count;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


