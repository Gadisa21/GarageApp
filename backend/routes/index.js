const express=require("express")

const router=express.Router()

const installRouter=require("./install.routes")

const employeeRouter=require("./employee.routes")

const loginRouter=require("./login.routes")

const serviceRouter=require("./service.routes")

//import customer routes
const customerRouter=require("./customer.routes")


router.use(installRouter)

router.use(loginRouter)

router.use(employeeRouter)

router.use(serviceRouter)

//use customer routes
router.use(customerRouter)



module.exports=router