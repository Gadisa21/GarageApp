const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.post("/api/employee/login", loginController.logIn);

module.exports = router;
