// const express=require('express')

import express from 'express'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import path from 'path'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './lib/db.js'
import { ENV } from './lib/env.js'

const app=express()

app.use(express.json())

app.use(cookieParser())


const __dirname=path.resolve()

dotenv.config()

const PORT = ENV.PORT || 3000

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)

if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,'../frontend/dist')))

    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log(`Listening to ${PORT} port`)
    connectDB()
})