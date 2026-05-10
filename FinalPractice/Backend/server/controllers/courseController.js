import Course from "../models/Course.js";

// CREATE COURSE
export const createCourse = async (
  req,
  res
) => {
  try {
    const { courseName, duration, fees } =
      req.body;

    if (!courseName || !duration || !fees) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingCourse =
      await Course.findOne({
        courseName,
      });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course already exists",
      });
    }

    const course = new Course({
      courseName,
      duration,
      fees,
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL COURSES
export const getAllCourses = async (
  req,
  res
) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      total: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE COURSE
export const getSingleCourse = async (
  req,
  res
) => {
  try {
    const course = await Course.findById(
      req.params.id
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE COURSE
export const updateCourse = async (
  req,
  res
) => {
  try {
    const updatedCourse =
      await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE COURSE
export const deleteCourse = async (
  req,
  res
) => {
  try {
    const deletedCourse =
      await Course.findByIdAndDelete(
        req.params.id
      );

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};