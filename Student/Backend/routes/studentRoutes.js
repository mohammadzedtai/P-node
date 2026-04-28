import express from "express";
import { createStudent , bulkStudents , getStudents , updateStudent , patchStudent , deleteStudent , countByCourse } from "../controllers/studentController.js";

const router = express.Router();

router.post("/create", createStudent);
router.post("/bulkStudents", bulkStudents);
router.get("/getStudents", getStudents);
router.get("/count-by-course", countByCourse);
router.put("/updateStudentsFUll/:id", updateStudent);
router.patch("/updateStudentspatch/:id", patchStudent);
router.delete("/deleteStudents/:id", deleteStudent);

export default router;