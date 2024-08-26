import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    UserName : {
        type : String , 
        required : true , 
        unique : true
    },
    Email : {
        type : String , 
        required : true , 
        unique : true
    },
    Password : {
        type : String , 
        required : true , 
    },
} , {timestamps : true})


const User = mongoose.model('Use' , userSchema)

export default User