import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import JWT from 'jsonwebtoken'



const Signup = async (req , res , next) => {
  //console.log(req.body)
  const { UserName , Email , Password } = req.body
  //? this for crypt password for more safety
  const cryptpassword = bcryptjs.hashSync(Password , 10)
  
  //? save the information from the user and add it in the data base 
  const newUser = new User({ UserName , Email , Password:cryptpassword })
  
  try{
      await newUser.save()
      res.status(201).json({msg : true , data : req.body })
      console.log("successfully signup")
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
    if(!validation) return res.status(500).send('user not exist')
    //? compare the pass that the user he will write by the pass that i have in validation
    const comparepass = bcryptjs.compareSync(Password , validation.Password) //? true or false
    if(!comparepass) return res.status(500).send('password is incorect')
    //? create a JWT token
    const token = JWT.sign({UserID : validation._id} , process.env.JWT_TOKEN)
    //? i destructure all information of the user but i ignore the password of user to not send him with cookies
    const {Password :pass , ...restinfo} = validation._doc ;
    //? when user is exist in the data base we send a response by message have a true value  
    res.cookie('access_token' , token , {httpOnly : true}).status(200).json({msg : true , data : validation})
    }
    catch(err) {
      next(err)
    }
} 


export default Signup