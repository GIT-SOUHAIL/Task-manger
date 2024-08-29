import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import JWT from 'jsonwebtoken'



const Signup = async (req , res , next) => {
  console.log(req.body)

  const { UserName , Email , Password } = req.body
  // this for crypt password for more safety
  const cryptpassword = bcryptjs.hashSync(Password , 10)
  
  const newUser = new User({ UserName , Email , Password:cryptpassword })

  try{
      await newUser.save()
      res.status(201).json({msg : 'data save successfully' })
      console.log("successfully")
  }catch (err) {
      //res.status(500).json(err.message)
      next(err)
  }

}


//? function SignIn

export const Signin = async (req , res , next) => {
     const {Email , Password } = req.body
    try{
    //? in this case i add this code to check if the eamil is exist in the database if he exist so we get the user that have this email
    const validation = await User.findOne({Email})
    if(!validation) return res.status(500).send('email not exist')
    //? compare the pass that the user he will write by the pass that i have in validation
    const comparepass = bcryptjs.compareSync(Password , validation.Password) 
    if(!comparepass) return res.status(500).send('pass not exist')
    //? create a JWT token
    const token = JWT.sign({UserID : validation._id} , process.env.JWT_TOKEN)
    //? i destructure all information of the user but i ignore the password of user to not send him with cookies
    const {Password :pass , ...restinfo} = validation._doc ;
    res.cookie('access-token' , token , {httpOnly : true}).status(200).json(restinfo)
    }
    catch(err) {
      next(err)
    }
} 


export default Signup