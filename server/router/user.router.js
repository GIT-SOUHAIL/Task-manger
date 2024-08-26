import  express from 'express'
import { testsrever } from '../controler/user.controler.js'


const router = express.Router()


router.get('/test',testsrever )


export default router