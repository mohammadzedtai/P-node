import Marks from "../models/Marks.js";

// ADD MARKS
export const addMarks = async (req, res) => {
  try {
    const { studentId, subject, marks } = req.body;

    if (!studentId || !subject || !marks) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newMarks = new Marks({
      studentId,
      subject,
      marks,
    });

    await newMarks.save();

    res.status(201).json({
      success: true,
      message: "Marks Added Successfully",
      data: newMarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL MARKS
export const getAllMarks = async (req, res) => {
  try {
    const marks = await Marks.find().populate(
      "studentId",
      "name email"
    );

    res.status(200).json({
      success: true,
      total: marks.length,
      data: marks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE MARK
export const getSingleMarks = async (req, res) => {
  try {
    const marks = await Marks.findById(req.params.id).populate(
      "studentId",
      "name email"
    );

    if (!marks) {
      return res.status(404).json({
        success: false,
        message: "Marks Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: marks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE MARKS
export const updateMarks = async (req, res) => {
  try {
    const updatedMarks = await Marks.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedMarks) {
      return res.status(404).json({
        success: false,
        message: "Marks Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Marks Updated Successfully",
      data: updatedMarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE MARKS
export const deleteMarks = async (req, res) => {
  try {
    const deletedMarks = await Marks.findByIdAndDelete(
      req.params.id
    );

    if (!deletedMarks) {
      return res.status(404).json({
        success: false,
        message: "Marks Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Marks Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};