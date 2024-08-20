

const express=require('express');
const { addBusiness,getProspects, searchProspect, updateProspectStatus } = require('../controller/BusinessController');
const { getUser,registeruser,LoginUser, updatePlan } = require('../controller/UserController');
const auth = require('../Middleware/auth');

const router=express.Router();



router.get('/user',getUser);
router.post('/register',registeruser);
router.post('/login',LoginUser);


router.post('/business',addBusiness)
router.post('/plan',auth,updatePlan);
router.get('/prospect',getProspects);
router.put('/:Id/status', updateProspectStatus);
router.get('/search',searchProspect)



module.exports=router;