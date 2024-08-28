import mongoose from "mongoose";

// this user schema is the role of what kind of data will must get and send to database mongodba
const userSchema = new mongoose.Schema({

            UserName : { type : String , required : true ,  unique : true  },
            Email : { type : String ,  required : true ,  unique : true },
            Password : { type : String ,  required : true },

} , {timestamps : true})


const User = mongoose.model('user' , userSchema)

export default User