import Assignment from "../models/Assignment.js";

// Create Assignment
export const createAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      teacherId,
      studentId,
    } = req.body;

    const assignment = await Assignment.create({
      title,
      description,
      teacherId,
      studentId,
      file: req.file ? req.file.path : "",
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Assignment Uploaded Successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("teacherId", "name email")
      .populate("studentId", "name email");

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Assignment
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(
      req.params.id
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment Not Found",
      });
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Assignment
export const updateAssignment = async (req, res) => {
  try {
    const assignment =
      await Assignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json({
      success: true,
      message: "Assignment Updated",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Assignment
export const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Assignment Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};