const mongoose=require('mongoose');

const prospectSchema=mongoose.Schema({
    businessId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business'
    },
    prospectName:{
        type:String,

    },
    contactInfo:{
        type:Number
    },
    sectortype:{
        type:String,
    },
    location:{
        type:String
    },
    status: { 
        type: String, 
        enum: ['New', 'Contacted', 'Interested', 'Not Interested'], 
        default: 'New'
     }

})


const Prospect=mongoose.model('Prospect',prospectSchema);
module.exports=Prospect;