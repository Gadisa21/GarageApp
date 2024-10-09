
const employeeService = require('../services/employee.service');
const jwt=require('jsonwebtoken')


const verifToken=  (req,res,next)=>{

    const authHeader = req.header('Authorization');
    if(!authHeader){
        return res.status(401).send({
            status:"Fail",
            message:"Access Denied"})
    }

    const token=authHeader.split(' ')[1]
    console.log("token",token)
    console.log("secret",process.env.JWT_SECRET)
    if(!token){
        return res.status(401).send({
            status:"Fail",
            message:"Access Denied"})
    }

    try{
        const decoded=  jwt.verify(token,process.env.JWT_SECRET)
        req.employee_email=decoded.employee_email
        next()
    }catch(err){
        res.status(400).send({
            status:"Fail",
            message:"Invalid Token"})
    }

}

const isAdmin=async (req,res,next)=>{


    const email=req.employee_email

    const employee=await employeeService.getEmployeeByEmail(email)

    if(employee[0]?.company_role_id===3){
        next()
    }else{
        res.status(403).send({
            status:"Fail",
            message:"Access Denied"})
    }

}

module.exports={verifToken,isAdmin}