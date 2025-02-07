const e = require('express');
const loginService = require('../services/login.service');
const jwt = require('jsonwebtoken');
const Jwt_secret = process.env.JWT_SECRET;

async function logIn(req, res,next) {
    try {
        console.log(req.body)
        const employee = await loginService.logIn(req.body);

        if (employee.status === 'Fail') {
            
            return res.status(403).json(
            {
                status:employee.status,
                message: employee.message
            }
            );
        }

        payload={
            employee_id:employee.data.employee_id,
            employee_email:employee.data.employee_email,
            employee_first_name:employee.data.employee_first_name,
            employee_role:employee.data.company_role_id,
        }
        
        const token=jwt.sign(payload,Jwt_secret,{expiresIn:"24h"})

        return res.status(200).json(
            {
                status:employee.status,
                message:"Employee logged in",
                data:{
                    token:token} })


    } catch (error) {
        console.log("loginC",error)
        return res.status(500).json(
            {
                status:"Fail",
                message:"Internal server error"
            }
        );
       
    }
}

module.exports = { logIn };