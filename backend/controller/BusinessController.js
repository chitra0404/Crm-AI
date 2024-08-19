const Business=require('../Models/BusinessModel');
const Prospect=require('../Models/ProspectModel');


module.exports.updatePlan=async(req,res)=>{
    const {plan}=req.body;
    await Business.updateOne({ userId: req.user.id }, { $set: { plan: plan } });
res.status(200).json({message:"plan updated"})
}

module.exports.getProspects=async(req,res)=>{
    const businesses = await Business.find({ userId: req.user.id });
    let allProspects = [];
    for (let business of businesses) {
        const prospects = await Prospect.find({ businessId: business._id });
        allProspects = allProspects.concat(prospects);
    }
    res.json(allProspects);
}

module.exports.addBusiness=async (req, res) => {
    const business = new Business({ ...req.body, userId: req.user.id });
    await business.save();

    
    const response = await axios.post('http://localhost:5000/predict', req.body);
    const prospects = response.data;

  
    for (let prospect of prospects) {
        const newProspect = new Prospect({ businessId: business._id, prospectName: prospect.prospectName, contactInfo: prospect.contactInfo });
        await newProspect.save();
    }

    res.json(prospects);
}