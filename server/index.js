import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './router/user.router.js'
import AuthRouter from './router/auth.router.js'
import cors from 'cors'

//? this for allow to use .env in BACK END 
dotenv.config()

const app = express()

//? careate a conection between database and mongoose
mongoose.connect(process.env.MONGO)
.then(()=> {
    console.log("have a conection with mongodb")
})
.catch((err)=> {
    console.log(err)
})

//? for to allow to use json
app.use(express.json()) 
app.use(cors({
    origin: 'http://localhost:5173' // السماح بالطلبات من المنفذ 5173
  }));

//? when make a get requist on /api/.... use the routes of UserRouter
app.use('/api/user' , UserRouter)
app.use('/api/auth' , AuthRouter)


//? create a middelware to handle a errors 

app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500 
    const message = err.message || 'faild operation'

    return res.status(statusCode).json({ message , statusCode , success : false })
})




const port = 5000
app.listen(port , () => {
    console.log(`server runing on port ${port}`)
})