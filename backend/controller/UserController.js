const User=require('../Models/UserModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


module.exports.registeruser=async(req,res)=>{
    // try{
    const{name,email,password,role}=req.body;
    const previousemail=await User.findOne({email:req.body.email})
    if(previousemail){
        res.status(400).json({status:"400",message:"user already exist"})
return
    }
    const hashpassword=await bcrypt.hash(password,10)
    const token=jwt.sign({email,role},process.env.JWT_SECRET)
    const user=new User({name,email,password:hashpassword,role})

    await user.save();
    res.status(200) .header("auth-token").json({token:token});
// }
// catch(err){
//     return res.status(500).json({ Message: "Internal server error" })

// }
}

module.exports.LoginUser=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(409).json({message:"authentication failed"});
    }
        const passwordmatch=await bcrypt.compare(password,user.password);
        if(!passwordmatch){
            return res.status(409).json({message:"invalid password"}); }
            if (user && passwordmatch) {
               console.log(user.role) 
                const token = jwt.sign( { userId:user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.json({
                 
                  
                  email: user.email,
                  role:user.role,
                 token:token
                })}
            else{
                return res.status(400).json({ message: 'invalid password' });
            }
}

module.exports.getUser=async(req,res)=>{
    try{
        const user=await User.find({})
        res.status(200).json({message:user})
    }
    catch(err){
        res.status(500).send({message:err})
    }
}