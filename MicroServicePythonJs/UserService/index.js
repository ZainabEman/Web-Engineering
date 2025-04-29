const express=require('express');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/userdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log("err",err);
})
const User=mongoose.model("User",{
    name:String,
    email:String
});

app.length('/users',async(_,res)=>{
    const users = await User.find();
    res.json(users);
});