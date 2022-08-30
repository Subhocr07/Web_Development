const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:String,
});

const postSchema=new mongoose.Schema({  
    name:String,
    title:String,
    body:String,
    image:String,
    // user:mongoose.SchemaTypes.ObjectId  //one way to get user
    user:String//we will use email as id
});

const userModal=mongoose.model("user",userSchema);
const postModal=mongoose.model("post",postSchema);

module.exports={userModal,postModal};

