import express from 'express'
import Signup from '../controler/auth.controler.js'
const router = express.Router()

router.post('/signup' , Signup )  

export default router