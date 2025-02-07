const {query}=require("../config/db.config")

const empoyeeData=require("../services/employee.service")

const bcrypt=require("bcrypt")

async function logIn(employeeData){

    try {
        const employeeInfo=await empoyeeData.getEmployeeByEmail(employeeData.employee_email)
let returnData={}
if(employeeInfo.length==0){
returnData={
    status:"Fail",
    message:"Employee does not exist"
}

return returnData  
}
const passwordMatch= await bcrypt.compare(employeeData.employee_password,employeeInfo[0]. employee_password_hashed)

if(! passwordMatch){

    returnData={
        status:"Fail",
        message:"Incorrect password"
    }
    return returnData
}

returnData={
    status:"Success",
    data:employeeInfo[0]
}
return returnData
    } catch (error) {
        console.log("error",error)
    }


}
module.exports={logIn}



