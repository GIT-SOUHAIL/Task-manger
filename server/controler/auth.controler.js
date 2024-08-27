import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

const Signup = async (req , res ) => {
  console.log(req.body)

  const { UserName , Email , Password } = req.body
  // this for crypt password for more safety
  const cryptpassword = bcryptjs.hashSync(Password , 10)
  
  const newUser = new User({ UserName , Email , Password:cryptpassword })

  try{
      await newUser.save()
      res.status(201).json({msg : 'data save successfully' })
  }catch (err) {
      res.status(500).json(err.message)
  }

}


export default Signup