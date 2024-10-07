const express=require("express")

const router=express.Router()

const installRouter=require("./install.routes")

const employeeRouter=require("./employee.routes")

const loginRouter=require("./login.routes")

router.use(installRouter)

router.use(employeeRouter)

router.use(loginRouter)

module.exports=router