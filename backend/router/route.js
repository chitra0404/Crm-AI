

const express=require('express');
const { updatePlan,addBusiness,getProspects } = require('../controller/BusinessController');
const { getUser,registeruser,LoginUser } = require('../controller/UserController');

const router=express.Router();



router.get('/user',getUser);
router.post('/register',registeruser);
router.post('/login',LoginUser);


router.post('/business',addBusiness)
router.post('/plan',updatePlan);
router.get('/prospect',getProspects);



module.exports=router;