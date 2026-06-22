import mongoose from "mongoose"

export const connectDB= async()=>{
    try{
     const conn=await mongoose.connect(process.env.MONGO_URI)
     console.log("mongo DB Connected",conn.connection.host)
    }catch(err){
     console.error("Error Connecting MONGO DB",error)
     process.exit(1)
    }
}