const express=require("express");
const ejs=require("ejs");

//config for app under express
const app=express();

//set ejs
app.set("view engine","ejs");

//need bodyparser also to read the  body ..or it will not read the req.body
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//saving form data in an array
let users=[];

//create server
app.listen(3000,(err,res)=>{
    if(!err){
        console.log("your server started");
    }else{
        console.log(err);
    }
});

//base route
app.get("/",(req,res)=>{
    res.render("dummy-users",{users})
});
//route for render page under views
//app.get("path name" ,res.render(filoe name under views folder))
app.get("/form",(req,res)=>{    
    res.render("form")
});

//another router created for add member on submit botton
app.post("/user/add",(req,res)=>{
    users.push(req.body);
    res.redirect("/");
});
