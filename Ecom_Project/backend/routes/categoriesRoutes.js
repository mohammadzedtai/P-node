import { Router } from "express";
import { createCategory, getAllCategory } from "../controllers/categoryController.js";
import { BulkuploadProduct, createProduct, getProductByCategoryId, getSingleProduct } from "../controllers/productController.js";

export const Routes = Router();

// categories routes 
Routes.post("/createcategory", createCategory);
Routes.get("/getAllCategories", getAllCategory)


// product routes
Routes.post("/createProduct", createProduct);
Routes.post("/bulkProduct", BulkuploadProduct)
Routes.get("/getAllByCategory/:id", getProductByCategoryId);
Routes.get("/getSingleProduct/:id", getSingleProduct)