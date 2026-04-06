const express = require('express');
const {body, validationResult} = require('express-validator');

const app = express();

app.use(express.json());

//Route

app.post("/register",
    //validation Rules
    [
        body("name")
        .notEmpty()
        .withMessage("Name is required"),

        body("email")
        .isEmail()
        .withMessage("email is required"),
        
        body("password")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 character")
    ], (req, res) => {
       const errors = validationResult(req);
       console.log(errors.array())
       //if validation fails 
       if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            message:"Validation Fails",
            errors:errors.array()
        })
       }

       res.status(201).json({
        success:true,
        message:"validation successfult",
        data:req.body
       })
    }
)

app.listen(3000, ()=>{
    console.log(`Server is running on this port ${3000}`)
})

