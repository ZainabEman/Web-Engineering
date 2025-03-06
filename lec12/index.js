// const bodyParser = require('body-parser');
const express=require('express');
const app=express();





// app.use(bodyParser.urlencoded({extends:false}));
// app.use(bodyParser.json());
// app.post('/login',(req,res)=>{
//     console.log(req.body);
//     console.log(req.body.user);
//     console.log(req.body.email);
//     res.send("User login successfully");
// })

// app.use((req,res,next)=>{
//     console.log("I m a middleware");
//     next();
// })

app.listen(3000,()=>{
    console.log("server is running at 3000");
});
app.get('/',(req,res)=>{
    res.send('<h1> aala</h1>');
});
app.get('/about',(req,res)=>{
    res.json({
        name:"Zainab"
    })
});


app.use((req,res,next)=>{
    console.log(req.method);
    console.log(req.protocol);
    console.log(req.get('host'));
    console.log(req.originalUrl);
    console.log(req.body.email);
    console.log(req.body.password);

    //console.log("I m a middleware");
    next();
})