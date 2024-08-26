import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

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







const port = 3000
app.listen(3000 , () => {
    console.log(`server runing on port ${port}`)
})