import Student from "../models/Student.js";

// CREATE STUDENT
export const createStudent = async (
  req,
  res
) => {
  try {
    const {
      userId,
      rollNumber,
      course,
      semester,
    } = req.body;

    if (
      !userId ||
      !rollNumber ||
      !course ||
      !semester
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingStudent =
      await Student.findOne({
        rollNumber,
      });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message:
          "Student already exists with this roll number",
      });
    }

    const student = new Student({
      userId,
      rollNumber,
      course,
      semester,
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL STUDENTS
export const getAllStudents = async (
  req,
  res
) => {
  try {
    const students = await Student.find()
      .populate("userId", "name email role");

    res.status(200).json({
      success: true,
      total: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE STUDENT
export const getSingleStudent = async (
  req,
  res
) => {
  try {
    const student = await Student.findById(
      req.params.id
    ).populate(
      "userId",
      "name email role"
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE STUDENT
export const updateStudent = async (
  req,
  res
) => {
  try {
    const updatedStudent =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Student Updated Successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE STUDENT
export const deleteStudent = async (
  req,
  res
) => {
  try {
    const deletedStudent =
      await Student.findByIdAndDelete(
        req.params.id
      );

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};