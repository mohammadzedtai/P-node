import Teacher from "../models/Teacher.js";

// CREATE TEACHER
export const createTeacher = async (
  req,
  res
) => {
  try {
    const { userId, subject, experience } =
      req.body;

    // validation
    if (
      !userId ||
      !subject ||
      experience === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check existing teacher
    const existingTeacher =
      await Teacher.findOne({ userId });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher already exists",
      });
    }

    const teacher = new Teacher({
      userId,
      subject,
      experience,
    });

    await teacher.save();

    res.status(201).json({
      success: true,
      message: "Teacher Created Successfully",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL TEACHERS
export const getAllTeachers = async (
  req,
  res
) => {
  try {
    const teachers = await Teacher.find()
      .populate("userId", "name email role");

    res.status(200).json({
      success: true,
      total: teachers.length,
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE TEACHER
export const getSingleTeacher = async (
  req,
  res
) => {
  try {
    const teacher = await Teacher.findById(
      req.params.id
    ).populate(
      "userId",
      "name email role"
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE TEACHER
export const updateTeacher = async (
  req,
  res
) => {
  try {
    const updatedTeacher =
      await Teacher.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Teacher Updated Successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TEACHER
export const deleteTeacher = async (
  req,
  res
) => {
  try {
    const deletedTeacher =
      await Teacher.findByIdAndDelete(
        req.params.id
      );

    if (!deletedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Teacher Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};