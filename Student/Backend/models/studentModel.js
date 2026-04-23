import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    age:{
        type:Number,
        require:true
    },
    course:{
        type:String,
        require:true
    },
    fees:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        default:"active"
    }
})

export const Students = mongoose.model("Student", studentSchema);

