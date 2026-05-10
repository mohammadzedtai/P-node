import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    file: {
      type: String,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "submitted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model(
  "Assignment",
  assignmentSchema
);

export default Assignment;