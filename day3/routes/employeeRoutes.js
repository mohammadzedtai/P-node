import express, { Router } from 'express'
import { bulkUploadEmployees, createEmployee, deleteEmployee, getAllEmployee, updateEmployee, updateEmployeePartially } from '../controllers/employeeLogic.js'

export const employeeRouter = Router()

employeeRouter.post("/create", createEmployee)
employeeRouter.get("/getEmployee", getAllEmployee)
employeeRouter.post("/bulkDataEmployee", bulkUploadEmployees)
employeeRouter.put("/updateFullUpDate/:id", updateEmployee)
employeeRouter.patch("/updatePartial/:id", updateEmployeePartially)
employeeRouter.delete("/deleteEmployee/:id", deleteEmployee)
