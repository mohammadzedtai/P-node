import { Employee } from "../models/employeeModel.js";

//CreateEmployee
export const createEmployee = async (req, res) => {
  try {
    const { name, age, email, department, salary } = req.body;
    console.log("here hitted", req.body)
    if (!name || !age || !department || !salary || !email) {
      return res.status(400).json({
        status: false,
        message: "Payload missing",
      });
    }
    const employee = await Employee.create({
      name,
      age,
      email,
      department,
      salary,
    });

    return res.status(201).json({
      status: true,
      message: "Data got created",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in Creating Employee ${error.message}`,
    });
    console.log(error);
    console.log(error.message);
  }
};

//bulkUploadEmployee
export const bulkUploadEmployees = async (req, res) => {
  try {
    const employees = req.body;
    //const employee = [{}, {}]
    if (!Array.isArray(employees)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Data OR not an array",
      });
    }
    const result = await Employee.insertMany(employees);

    return res.status(201).json({
      status: true,
      message: "Data got inserted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: `Error in insertData ${error.message}`,
    });
  }
};

//Read, serach, sort, orderBy, pagination
export const getAllEmployee = async (req, res) => {
  try {
    let { search, sortBy, order, page, limit } = req.query;

    // Default values
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    // Safety checks
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    if (limit > 50) limit = 50;

    let query = {};

    // SEARCH
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { department: { $regex: search, $options: "i" } },
        ],
      };
    }

    // SORT
    let sortOption = {};
    if (sortBy) {
      sortOption[sortBy] = order === "desc" ? -1 : 1;
    }

    // PAGINATION
    const skip = (page - 1) * limit;

    const employees = await Employee.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Employee.countDocuments(query);

    return res.json({
      status: true,
      message: "employee get",
      data: employees,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        perPage: limit,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: `Error in getAll Employees ${error.message}`,
    });
  }
};
//updateEmployeeAll
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, department, salary } = req.body;
    if (!name || !email || !age || !department || !salary) {
      return res.json({
        status: false,
        message: "All Fields are Required",
      });
    }
    //Check if employee Exist
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        status: false,
        message: "Employee not Exist",
      });
    }
    const updateEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: true,
      message: "Employee Got Updated",
      data: updateEmployee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in UpdateEmployee ${error.message}`,
    });
  }
};

//updateEmployeePartially
export const updateEmployeePartially = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if employee Exist
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        status: false,
        message: "Employee not Exist",
      });
    }
    const updateEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: true,
      message: "Employee Got Updated",
      data: updateEmployee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in UpdateEmployee ${error.message}`,
    });
  }
};

//delete
export const deleteEmployee = async (req, res) => {
  try {
    const {id} = req.params;
    const employee = await Employee.findById(id);
    if(!employee){
        res.status(404).json({
            status:false,
            message:"Not Found"
        })
    }
    const deleteEmployee = await Employee.findByIdAndDelete(id);
    return res.status(204).json({
        status:true,
        message:"Employee Deleted",
        data:deleteEmployee
    })
  } catch (error) {
    console.log(error.message)
   res.json({
    status:false,
    message:`Error found in DeleteAPI ${error.message}`
   })
  }
};

