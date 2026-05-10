import express from "express";
import { markAttendance, getAllAttendance, getSingleAttendance, updateAttendance, deleteAttendance, getStudentAttendance } from "../controllers/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, markAttendance);
router.get("/", authMiddleware, getAllAttendance);
router.get("/:id", authMiddleware, getSingleAttendance);
router.put("/:id", authMiddleware, updateAttendance);
router.delete("/:id", authMiddleware, deleteAttendance);
router.get("/student/:studentId", authMiddleware, getStudentAttendance);

export default router;