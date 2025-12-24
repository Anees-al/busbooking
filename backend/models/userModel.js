import mongoose from "mongoose";



// create model for users
const userSchema= new mongoose.Schema({
    fullname:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['user','admin'],default:'user'}
},{timestamps:true});



const userModel=new mongoose.model('user',userSchema);
export default userModel;