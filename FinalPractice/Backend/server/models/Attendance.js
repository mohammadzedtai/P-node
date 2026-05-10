import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

export default Attendance;  