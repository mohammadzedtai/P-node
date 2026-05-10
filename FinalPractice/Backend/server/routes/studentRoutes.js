import express from "express";
import { createStudent, getAllStudents, getSingleStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createStudent);
router.get("/", authMiddleware, getAllStudents);
router.get("/:id", authMiddleware, getSingleStudent);
router.put("/:id", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);

export default router;