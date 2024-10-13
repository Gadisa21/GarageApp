const express=  require('express');
const customerController = require('../controllers/customer.controller');

const router = express.Router();


router.post('/api/customer', customerController.createCustomer);

module.exports = router;