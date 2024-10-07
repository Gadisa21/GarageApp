const express=require('express');
const router=express.Router();
const employeeController=require('../controllers/employee.controller');

const authMiddleware=require('../middlewares/auth.middleware');

router.post('/api/employee',[authMiddleware.verifToken,authMiddleware.isAdmin],employeeController.createEmployee);

module.exports=router;
