// const express= require ('express');
// const app=express();

// app.get('/', (req,res)=>{
//     res.send("i am active");

// })
// app.listen(3000,"server is running at 3000")


const user = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890"
  };
  

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("I am active");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
