const express=require("express")

const router=express.Router()

const installRouter=require("./install.routes")

const employeeRouter=require("./employee.routes")

const loginRouter=require("./login.routes")

const serviceRouter=require("./service.routes")

router.use(installRouter)

router.use(loginRouter)

router.use(employeeRouter)

router.use(serviceRouter)



module.exports=router