import express from 'express';

const app = express();
app.use(express.json());

//Dummy data (instead of Db)
let users = [
    {id:1, name:'zed', age:18},
    {id:2, name:'arman', age:18},
    {id:3, name:'ayan', age:18}
]

app.delete("/deleteUser", (req, res)=>{
    console.log("here is string id",req.query.id, typeof(req.query.id))
    const id = parseInt(req.query.id) //here I am converting strng into Number which was got from url OR endpoint
    //id = 2
    console.log("here is after converting the type",typeof(id), id)

    const index = users.findIndex(user => user.id === id)//{id:2, name:'arman', age:18}

    if(index == -1){
        return res.status(404).json({status:false, message:"Not Found"})
    }
    console.log(index) // 1
    users.splice(index, 1)//this is used for delete the element from array
    return res.status(200).json({
        status:true,
        message:"User Deleted",
        data:users
    })
})

app.put("/updateUser", (req, res)=>{
    const id = parseInt(req.query.id);//3
    const {name, age} = req.body //{"name":"aryan","age":21}

    const user = users.find(u => u.id === id);//{id:3, name:'ayan', age:18}

    if(!user){
        return res.status(404).json({message:"User not Found"})
    }

    //update feilds
    if(name) user.name = name
    if(age) user.age = age
    res.status(200).json({
        status:true,
        message:"User Got Updated",
        data:user
    })

})
app.listen(3000, ()=>{
    console.log(`Server is running 3000 port`)
})