const express=require("express");
const router=express.Router();
const employeeController=require('../controllers/employee.controller');

const authMiddleware=require('../middlewares/auth.middleware');

router.post('/api/employee',[authMiddleware.verifToken,authMiddleware.isAdmin],employeeController.createEmployee);

router.get("/api/employee",[authMiddleware.verifToken,authMiddleware.isAdmin],employeeController.getEmployees);

router.get("/api/employee/:id",[authMiddleware.verifToken,authMiddleware.isAdmin],employeeController.getEmployeeById);

router.put("/api/employee",[authMiddleware.verifToken,authMiddleware.isAdmin],employeeController.updateEmployee);

router.delete("/api/employee/:id",[authMiddleware.verifToken,authMiddleware.isAdmin],employeeController.deleteEmployee);

module.exports=router;