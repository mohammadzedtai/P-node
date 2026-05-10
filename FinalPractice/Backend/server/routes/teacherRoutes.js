import express from "express";
import { createTeacher, getAllTeachers, getSingleTeacher, updateTeacher, deleteTeacher } from "../controllers/teacherController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTeacher);
router.get("/", authMiddleware, getAllTeachers);
router.get("/:id", authMiddleware, getSingleTeacher);
router.put("/:id", authMiddleware, updateTeacher);
router.delete("/:id", authMiddleware, deleteTeacher);

export default router;