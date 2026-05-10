import Attendance from "../models/Attendance.js";

// MARK ATTENDANCE
export const markAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const alreadyMarked = await Attendance.findOne({
      studentId,
      date,
    });

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked",
      });
    }

    const attendance = new Attendance({
      studentId,
      date,
      status,
    });

    await attendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance Marked Successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL ATTENDANCE
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate(
      "studentId",
      "name email"
    );

    res.status(200).json({
      success: true,
      total: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE ATTENDANCE
export const getSingleAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(
      req.params.id
    ).populate("studentId", "name email");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ATTENDANCE
export const updateAttendance = async (req, res) => {
  try {
    const updatedAttendance =
      await Attendance.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedAttendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance Updated Successfully",
      data: updatedAttendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE ATTENDANCE
export const deleteAttendance = async (req, res) => {
  try {
    const deletedAttendance =
      await Attendance.findByIdAndDelete(
        req.params.id
      );

    if (!deletedAttendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET STUDENT ATTENDANCE
export const getStudentAttendance = async (
  req,
  res
) => {
  try {
    const studentAttendance =
      await Attendance.find({
        studentId: req.params.studentId,
      });

    res.status(200).json({
      success: true,
      total: studentAttendance.length,
      data: studentAttendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};