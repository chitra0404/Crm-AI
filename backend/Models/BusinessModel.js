const mongoose=require('mongoose');

const businessSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
    },
    sectortype:{
      type:String,
    },
    targetcustomer:{
        type:String,
    },
    location:{
        type:String,
    },
    plan:{
        type:String,
        enum: ['Basic', 'Medium', 'Advanced'], 
        required: true 

    },
    contactInfo:{
        type:Number,
    },
   businessemail: { 
        type: String,
        
          },
})

const Business=mongoose.model('Business',businessSchema);
module.exports=Business;