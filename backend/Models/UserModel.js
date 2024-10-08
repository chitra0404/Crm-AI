const mongoose=require('mongoose');


const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['company','user'],
        default:'user'
    },
    plan:{
        type:String,
        enum: ['Basic', 'Medium', 'Advanced'], 
       

    }
})

const User=mongoose.model('User',UserSchema)
module.exports=User;