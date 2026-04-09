import express, { Router } from 'express'
import { bulkUploadEmployees, createEmployee, getAllEmployee } from '../controllers/employeeLogic.js'

export const employeeRouter = Router()

employeeRouter.post("/create", createEmployee)
employeeRouter.get("/getEmployee", getAllEmployee)
employeeRouter.post("/bulkDataEmployee", bulkUploadEmployees)