import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './router/user.router.js'


// this for allow to use .env in BACK END 
dotenv.config()

const app = express()

// careate a conection between database and mongoose
mongoose.connect(process.env.MONGO)
.then(()=> {
    console.log("have a conection with mongodb")
})
.catch((err)=> {
    console.log(err)
})


// when make a get requist on /api/user use the routes of UserRouter
app.use('/api/user', UserRouter)



const port = 3000
app.listen(3000 , () => {
    console.log(`server runing on port ${port}`)
})