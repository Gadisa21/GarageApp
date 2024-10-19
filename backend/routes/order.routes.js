const express=require('express');
const router=express.Router();
const orderController=require('../controllers/order.controller');
const authMiddleware=require('../middlewares/auth.middleware');

router.post('/api/order',[authMiddleware.verifToken,authMiddleware.isAdmin],orderController.createOrder);

router.get('/api/orders',[authMiddleware.verifToken,authMiddleware.isAdmin],orderController.getOrders);


module.exports=router;