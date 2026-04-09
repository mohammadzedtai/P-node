import { Employee } from "../models/employeeModel.js";

export const createEmployee = async(req, res) => {
    try {
        const {name, age,email, department, salary} = req.body;
        if(!name || !age || !department || !salary || !email){
            return res.status(400).json({
                status: false,
                message:"Payload missing"
            })
        }
        const employee = await Employee.create({name, age, email, department, salary})

        return res.status(201).json({
            status:true,
            message:"Data got created",
            data:employee
        })
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:`Error in Creating Employee ${error.message}`
        })
        console.log(error)
        console.log(error.message)
    }
}
export const bulkUploadEmployees = async(req, res) => {
    try {
        const employees = req.body;
        //const employee = [{}, {}]
        if(!Array.isArray(employees)){
            return res.status(400).json({
                status:false,
                message:"Invalid Data OR not an array"
            })
        }
        const result = await Employee.insertMany(employees);

        return res.status(201).json({
            status:true,
            message:"Data got inserted",
            data:result
        })

    } catch (error) {
        res.status(400).json({
            status:false,
            message:`Error in insertData ${error.message}`
        })
    }
}
export const getAllEmployee = async(req, res) => {
    try {
        const {search, sortBy, order} = req.query;
        //search , sortBy , order  ?sortBy

        let query = {};//variable for object and empty this


        if(search){
            query = {
                $or:[
                    {name: {$regex: search , $options:"i"}},
                    {department:{$regex: search, $options:"i"}}
                ]
            }
        }

        //sort
        let sortOption = {};

        if(sortBy){
            sortOption[sortBy] = order === "desc" ? -1 : 1;
        }

        const employees = await Employee.find(query).sort(sortOption)

        return res.json({
            status:true,
            message:"employee get",
            data:employees
        })
    } catch (error) {
        return res.json({
            status:false,
            message: `Error in getAll Employees ${error.message}`
        })
    }
}
//update

//delete

/**
$or:[
                    {name: {$regex: search , $options:"i"}},
                    {department:{$regex: search, $options:"i"}}
    ] 
                    
 */