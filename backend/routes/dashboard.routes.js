const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/auth.middleware')
const dashboardController=require('../controllers/dashboard.controller');

router.get('/api/dashboard/kpis',[authMiddleware.verifToken,authMiddleware.isAdmin], dashboardController.getKPIs);
router.get('/api/dashboard/order-trends',[authMiddleware.verifToken,authMiddleware.isAdmin], dashboardController.getOrderTrends);
router.get('/api/dashboard/revenue-breakdown',[authMiddleware.verifToken,authMiddleware.isAdmin], dashboardController.getRevenueBreakdown);
module.exports=router;