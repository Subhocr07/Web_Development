
const mongoose=require("mongoose");//11


const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    isPromoted:Boolean,

});
const usermodal=mongoose.model("user", userSchema);

module.exports=usermodal;   
