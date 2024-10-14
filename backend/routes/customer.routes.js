const express=  require('express');
const customerController = require('../controllers/customer.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();


router.post('/api/customer',[authMiddleware.verifToken,authMiddleware.isAdmin], customerController.createCustomer);
router.get('/api/customer/:id',[authMiddleware.verifToken,authMiddleware.isAdmin], customerController.getCustomer);
router.get("/api/customer",[authMiddleware.verifToken,authMiddleware.isAdmin],customerController.getCustomers);
router.put("/api/customer",[authMiddleware.verifToken,authMiddleware.isAdmin],customerController.updateCustomer);

module.exports = router;