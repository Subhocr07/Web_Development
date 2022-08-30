const express=require("express");
const mongoose=require("mongoose");
const {userModal,postModal}=require("./schema");
const bcrypt=require("bcryptjs");
const salt=10;
const jwt=require("jsonwebtoken");
require("dotenv").config();
const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const port=3003;

//setting up server
app.listen(port,(err)=>{
    if(!err){
        console.log(`Server started at ${port}`)
    }else{ 
        console.log(err)}
});

//setting up database
mongoose.connect("mongodb://localhost/assignments_5",()=>{
    console.log("connected to db")
},(err)=>{
    console.log(err)
});

//setting register route
app.post("/register", (req,res)=>{
    //generate salt
    bcrypt.genSalt(salt,(err,hashSalt)=>{
        //generating hash
        bcrypt.hash(req.body.password,hashSalt,(err,passwordHash)=>{
            //saving input dtails to schema
            userModal.create({name:req.body.name,email:req.body.email,password:passwordHash}).then(()=>{
                res.status(200).send("user added succesfully")
            }).catch((err)=>{
                res.status(400).send(err)
            })
        })
    })
});

//log-in route
app.post("/login", (req,res)=>{
    //find the email existence
    userModal.find({email:req.body.email}).then((user)=>{
        //verifying the user 
        if(user.length){
            //if user found ..will compare password 
            bcrypt.compare(req.body.password,user[0].password).then((match)=>{
                //it will return true or false
                    if(match){//generate a jwt 
                        //for jwt we are requiring a SECRET_KEY and a Payload
                        //secret key--open REPL--> crypto.randomBytes(64).toString("hex")
                        //store it in an .env file
                                                    //payload
                        const authToken=jwt.sign(req.body.email, process.env.SECRET_KEY);
                        res.status(200).send({authToken})
                    }else{
                        res.status(400).send("invalid password")
                    }
            });
            //if user not find
        }else{
            res.status(400).send("user not exist")
        }

    })
});


//creating post routes and verify each time for post
app.post("/post",(req,res)=>{
    if(req.headers.authorization){
      try{
        const userEmail= jwt.verify(req.headers.authorization,process.env.SECRET_KEY);
        postModal.create({body:req.body.body,image:req.body.image,title:req.body.title,user:userEmail}).then(()=>{
            res.status(200).send("post added succesfully")
        })
       }catch(err){
            res.status(403).send("user not authorised")
       }
       
    }else{
        res.status(400).send("missing auth token")
    }
});

//get the  posts
app.get("/post",(req,res)=>{
    if(req.headers.authorization){
        try{
          const userEmail= jwt.verify(req.headers.authorization,process.env.SECRET_KEY);
          postModal.find({user:userEmail}).then((posts)=>{
                res.status(200).send(posts);
          })
         }catch(err){
              res.status(403).send("user not authorised")
         }
         
      }else{
          res.status(400).send("missing auth token")
      }
});

app.put("post/id:",(req,res)=>{
    if(req.headers.authorization){
        postModal.find({_id:req.params.id}).then((post)=>{
            try{
                const userEmail= jwt.verify(req.headers.authorization,process.env.SECRET_KEY);
                if(post[0].user===userEmail){
                    postModal.updateOne({_id:req.params.id},{}).then((posts)=>{
                        res.status(200).send("posts updated succesfully");
                    });
                }else{
                    res.status(403).send("post can't be updated")
                }
            }catch(err){
              res.status(403).send("user not authorised")
            }
        });         
      }else{
          res.status(400).send("missing auth token")
      }
});

//delete
app.put("post/id:",(req,res)=>{
    if(req.headers.authorization){
        postModal.find({_id:req.params.id}).then((post)=>{
            try{
                const userEmail= jwt.verify(req.headers.authorization,process.env.SECRET_KEY);
                if(post[0].user===userEmail){
                    postModal.deleteOne({_id:req.params.id},{}).then((posts)=>{
                        res.status(200).send("post deleted succesfully");
                    });
                }else{
                    res.status(403).send("post can't be deleted")
                }
            }catch(err){
              res.status(403).send("user not authorised")
            }
        });         
      }else{
          res.status(400).send("missing auth token")
      }
});


