// const express=require('express')

import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'

const app=express()

dotenv.config()

const PORT = process.env.PORT || 3000

app.get('/api/auth',authRoutes)
app.get('/api/messages',messageRoutes)

app.listen(PORT,()=>{
    console.log(`Listening to ${PORT} port`)
})