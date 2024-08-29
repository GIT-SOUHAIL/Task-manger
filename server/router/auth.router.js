import express from 'express'
import Signup from '../controler/auth.controler.js'
import {Signin} from '../controler/auth.controler.js'
const router = express.Router()

router.post('/signup' , Signup )  
router.post('/signin' , Signin )  


export default router