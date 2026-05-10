import express from "express";

import { addMarks, getAllMarks, getSingleMarks, updateMarks, deleteMarks } from "../controllers/marksController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addMarks);
router.get("/", authMiddleware, getAllMarks);
router.get("/:id", authMiddleware, getSingleMarks);
router.put("/:id", authMiddleware, updateMarks);
router.delete("/:id", authMiddleware, deleteMarks);

export default router;