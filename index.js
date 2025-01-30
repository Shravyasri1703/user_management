import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/user.route.js'
import notificationRoutes from './routes/notification.route.js'
import cookieParser from 'cookie-parser'
import "./lib/notificationScheduler.js"
const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/notifications', notificationRoutes)


const port = process.env.PORT
const url = process.env.MONGO_URL

const connection = async (req, res) =>{
    try{
           await mongoose.connect(url)
           console.log("Connected to Db")
    }
    catch(err){
       console.log("Error while connecting", err)
    }
}

connection()

app.listen(port, ()=>{
    console.log("Running on port :",port)
})