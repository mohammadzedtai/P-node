import express from "express";
import { createAssignment, getAssignments, getAssignmentById, updateAssignment, deleteAssignment } from "../controllers/assignmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("file"), createAssignment);
router.get("/", authMiddleware, getAssignments);
router.get("/:id", authMiddleware, getAssignmentById);
router.put("/:id", authMiddleware, updateAssignment);
router.delete("/:id", authMiddleware, deleteAssignment);

export default router;