const express=require('express')
const app=express()
const authRoute=require('../Router/authRoute')
const messageRoute=require('../Router/messageRoute')
const cookieParser = require('cookie-parser');
const {connectDB}=require('../lib/db')
const cors=require('cors')
require('dotenv').config()

const PORT=process.env.PORT
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:'true'
}))

app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/message',messageRoute)
app.listen(PORT,()=>{
    console.log(`the server is runing on port ${PORT}....`)
    connectDB()
})