import mongoose from "mongoose"

export const connectDB= async()=>{
    try{
     const conn=await mongoose.connect(process.env.MONGO_URI)
    }catch(err){
     console.error("Error Connecting MONGO DB",error)
     process.exit(1)
    }
}