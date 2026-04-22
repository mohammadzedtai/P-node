import express from "express";
import { createStudent , bulkStudents , getStudents , updateStudent , patchStudent , deleteStudent , countByCourse } from "../controllers/studentController.js";

const router = express.Router();

router.post("/create", createStudent);
router.post("/bulk", bulkStudents);
router.get("/get", getStudents);
router.get("/count-by-course", countByCourse);
router.put("/update/:id", updateStudent);
router.patch("/patch/:id", patchStudent);
router.delete("/delete/:id", deleteStudent);

export default router;