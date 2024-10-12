const express=require("express");

const authMiddleware=require("../middlewares/auth.middleware")

const router=express.Router();

const serviceController=require('../controllers/service.controller');


router.post('/api/service',[authMiddleware.verifToken,authMiddleware.isAdmin],serviceController.createService);

router.get('/api/service',[authMiddleware.verifToken,authMiddleware.isAdmin],serviceController.getAllServices);

router.get('/api/service/:id',[authMiddleware.verifToken,authMiddleware.isAdmin],serviceController.getServiceById);





module.exports=router;