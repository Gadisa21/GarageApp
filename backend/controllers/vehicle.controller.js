const vehicleService = require('../services/vehicle.service');

async function createVehicle(req,res,next){
    try {
        //first check if the vehicle already exists
        const vehicle = await vehicleService.getVehicleBySerial(req.body.vehicle_serial);
        if(vehicle){
            return res.status(400).json({
                status:"Fail",
                message:"Vehicle already exists"});
        }
        //if vehicle does not exist, create a new vehicle
        const newVehicle = await vehicleService.createVehicle(req.body);
        if(newVehicle){
            return res.status(200).json({
                status:"Success",
                message:"Vehicle created successfully",
                });
        }else{
            return res.status(400).json({
                status:"Fail",
                message:"Vehicle not created"});
        }

        
    } catch (error) {
        return res.status(500).json({
            status:"Fail",
            message:"something went wrong",});
        
    }
}

async function getVehicleById(req,res,next){
    try {
        const vehicle = await vehicleService.getVehicleId(req.params.id);
        if(vehicle){
            return res.status(200).json({
                status:"true",
                message:"Vehicle found",
                data:vehicle});
        }else{
            return res.status(400).json({
                status:"Fail",
                message:"Vehicle not found"});
        }
        
    } catch (error) {
        return res.status(500).json({
            status:"Fail",
            message:"something went wrong",});
        
    }
}

module.exports={
    createVehicle
    ,getVehicleById
}