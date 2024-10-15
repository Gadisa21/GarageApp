const express=require('express');
const router=express.Router();
const vehicleController=require('../controllers/vehicle.controller');
const authMiddleware=require('../middlewares/auth.middleware');

router.post("/api/vehicle",[authMiddleware.verifToken,authMiddleware.isAdmin],vehicleController.createVehicle);
router.get("/api/vehicle/:id",[authMiddleware.verifToken,authMiddleware.isAdmin],vehicleController.getVehicleById);

router.put("/api/vehicle/",[authMiddleware.verifToken,authMiddleware.isAdmin],vehicleController.updateVehicle);

module.exports=router;