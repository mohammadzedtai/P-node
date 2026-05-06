import express , { Router } from "express";
import { login, register , addComment , getCommentsByPost , deleteComment , bulkUpload, createPost, deletePost, dislikePost, getAllPost, getSingleById, likePost, updatePost } from "../controller/Controller.js";
import { authMiddle } from "../middleware/Middleware.js";
import { ownMiddle } from "../middleware/Middleware.js";


export const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add/:postId", authMiddle, addComment)
router.get("/get/:postId", getCommentsByPost)
router.delete("/delete/:id", authMiddle, deleteComment);
router.post("/create",authMiddle,createPost)
router.post("/bulk",authMiddle, bulkUpload)
router.get("/getAll",getAllPost)  
router.get("/get/:id",getSingleById)
router.put("/update/:id",authMiddle, ownMiddle,updatePost)
router.delete("/delete/:id",authMiddle,ownMiddle,deletePost)
router.patch("/like/:id", authMiddle, likePost);
router.patch("/dislike/:id", authMiddle, dislikePost);

//http://localhost:5000/api/posts/getAll?search=Guide&sortBy=createdAt&order=desc&page=1&limit=10