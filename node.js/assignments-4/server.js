const express=require("express");//1
const mongoose=require("mongoose");//2
const ejs=require("ejs");//4
const usermodal=require("./userSchema");
const methodOverride=require("method-override");//11



const app=express();//3

//midleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
//set script
app.set("view engine","ejs");


//define classUpdate method to update isPromoted
const getClass=(isPromoted)=>{
    let className="secondary";
    if(isPromoted){
        className="primary";
    }else if(isPromoted!==null){
        className="danger"
    }
    return className;
}

app.listen(8080,(err)=>{//5
    if(!err){
        console.log("server stared at 8080")
    }else{
    console.log(err)
    }
});

mongoose.connect("mongodb://localhost/assignments-4" ,(err)=>{//6
        if(!err){
            console.log("Database connected to mongoose")
        }else{
            console.log(err)
        }
});

//landing page
app.get("/",(req,res)=>{
    usermodal.find().then((user)=>{
        res.render("user",{user,getClass})
    });
    
});


app.post("/user/add", (req,res)=>{//7

    //checking email is unique or not
    usermodal.find({email:req.body.email}).then((userData)=>{
        if(userData.length){
        res.status(400).send("user already exist");
        }else{
            //taking input from body and adding to database user collection by usermodal
            usermodal.create({name:req.body.name,email:req.body.email,isPromoted:null}).then(()=>{
                usermodal.find().then(()=>{
                    res.redirect("/");
                });

            }).catch((err)=>{
                console.log(err);
            });

        }
    })
});

app.put("/user/update/:id",(req,res)=>{
    usermodal.find({email:req.params.id}).then((userData)=>{
        usermodal.updateOne({email:req.params.id},[{"$set":{
            "isPromoted":{"$eq":[null,"$isPromoted"]}
        }}]).then(()=>{
            res.redirect("/");
        }).catch((err)=>{
            res.status(400).send(err);
        });
    })
});

app.delete("/user/delete/:id" , (req,res)=>{
    usermodal.deleteOne({email:req.params.id}).then(()=>{
        res.redirect("/");
    });
});

app.get("/form",(req,res)=>{//10
    res.render("user-form");
});
