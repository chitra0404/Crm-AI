const Business=require('../Models/BusinessModel');
const Prospect=require('../Models/ProspectModel');

const axios=require('axios')

module.exports.searchProspect=async(req,res)=>{
    const { location, sectortype } = req.query;

    try {
        const query = {};
        if (location) query.location = location;
        if (sectortype) query.sectortype = sectortype;

        const prospects = await Prospect.find(query).populate('businessId'); 
        res.json(prospects);
    } catch (error) {
        console.error('Error fetching prospects:', error);
        res.status(500).json({ message: 'Error fetching prospects' });
    }
}


module.exports.updateProspectStatus = async (req, res) => {
  const { Id } = req.params;
  const { status } = req.body;

  try {
    const prospect = await Prospect.findByIdAndUpdate(prospectId, { status }, { new: true });
    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    res.status(200).json(prospect);
  } catch (error) {
    console.error('Error updating prospect status:', error);
    res.status(500).json({ message: 'Error updating prospect status' });
  }
};



module.exports.getProspects=async(req,res)=>{
    const businesses = await Business.find({ userId: req.user._id });
    let allProspects = [];
    for (let business of businesses) {
        const prospects = await Prospect.find({ businessId: business._id });
        allProspects = allProspects.concat(prospects);
    }
    res.json(allProspects);
}

module.exports.addBusiness = async (req, res) => {
    const { businessemail } = req.body;

    try {
        // Check if a business with the same email already exists
        const existingBusiness = await Business.findOne({ businessemail });

        if (existingBusiness) {
            return res.status(400).json({ message: 'Business with this email already exists' });
        }

        // Create and save the new business
        const business = new Business({ ...req.body, userId: req.userId });
        await business.save();

        // Fetch prospects based on the business details
        const response = await axios.post('http://localhost:5000/predict', req.body);

        if (response.status !== 200) {
            return res.status(response.status).json({ message: 'Error fetching prospects from external API' });
        }

        const prospects = response.data;

        // Save each prospect to the database
        for (let prospect of prospects) {
            const newProspect = new Prospect({
                businessId: business._id,
                prospectName: prospect.prospectName,
                contactInfo: prospect.contactInfo
            });
            await newProspect.save();
        }

        res.status(201).json({ message: 'Business added and prospects saved successfully', prospects });

    } catch (error) {
        console.error('Error adding business:', error);
        res.status(500).json({ message: 'Error adding business' });
    }
};