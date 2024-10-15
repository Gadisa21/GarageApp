const express=require('express');
const router=express.Router();
const vehicleController=require('../controllers/vehicle.controller');
const authMiddleware=require('../middlewares/auth.middleware');

router.post("/api/vehicle",[authMiddleware.verifToken,authMiddleware.isAdmin],vehicleController.createVehicle);

module.exports=router;