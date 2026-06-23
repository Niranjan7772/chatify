import { sendWelcomeEmail } from "../email/emailHandlers.js"
import { ENV } from "../lib/env.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"
import bycrypt from "bcryptjs"
import "dotenv/config"

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body
    
    try{
       if(!fullName || !email || !password){
         return res.status(400).json({message:"All fields are required"})
       }
       if(password.length<6){
         return res.status(400).json({message:"Password must be atleast 6 characters"})
       }

       const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

       if(!emailRegex.test(email)){
        return res.status(400).json({message:"Invalid email format"})
       }

       const user=await User.findOne({email})

       const salt=await bycrypt.genSalt(10)

       const hashedPassword=await bycrypt.hash(password,salt)

       const newUser=new User({
        fullName,email,
        password:hashedPassword
       })
  let savedUser
       if(newUser){
          
         savedUser=await newUser.save()
         
          generateToken(savedUser._id,res)

          res.status(201).json({
            _id:savedUser._id,
            fullName:savedUser.fullName,
            email:savedUser.email,
            profilePic:savedUser.profilePic
          })
       }else{
          res.status(400).json({message:"Invalid user data"})
       }

       if(user){
          return res.status(400).json({message:"Email already exists"})
       }
        
       try{
         await sendWelcomeEmail(savedUser.email,savedUser.fullName,ENV.CLIENT_URL)
       }catch(error){
         console.error("Failed to send welcome email",error)
       }

    }catch(err){
         console.log("Error in signup controller",err)
         res.status(500).json({message:"Internal Server Error"})
    }
}