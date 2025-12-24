import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// create a user 
export const createUser=async(req,res)=>{
    try {
        const {fullname,email,phone,password,confirmpassword}=req.body;
    

    if(!fullname,!email,!phone,!password){
        return res.status(400).json({message:'please fill all the fields'})
    }

//check the user is already in the database
    const exisitingUser=await userModel.findOne({$or:[{email:email},{phone:phone}]});

    if(exisitingUser){
        return res.status(400).json({message:'user already there'})
    }

 //compare password and confirmation password is equal
    if(password!==confirmpassword){
        return res.status(400).json({message:'password not matching'})
    }

//hashing the password
    const hashpassword=await bcrypt.hash(password,10);

    const user=new userModel({fullname,email,phone,password:hashpassword});
//generate a token
     const token = jwt.sign(
      { id:user._id,role:user._role },
      process.env. JWT_SECRET,
      { expiresIn: "1d" }
    );
//save the user to database

    await user.save();
    return res.status(200).json({message:'succefully user created',user,token})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }

}

// login controller to existing user

export const login=async(req,res)=>{
    try {
        const {email ,password}=req.body;
        if(!email ||!password){
            return res.status(400).json({message:'please fill all the fields'})
        }
        // find the user from database by email
        const exisitingUser=await userModel.findOne({email});
        if(!exisitingUser){
            return res.status(400).json({message:'user not found'});
        }

       // compare the entered password and database password 
        const comparepassword=await bcrypt.compare(password,exisitingUser.password);
        
        if(!comparepassword){
            return res.status(400).json({message:'password is incorrect'})
        }
//generate token
        const token = jwt.sign(
      { id: exisitingUser._id, role: exisitingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );


        return res.status(200).json({message:'successfully logined',exisitingUser,token})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}