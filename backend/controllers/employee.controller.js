const employeeService = require('../services/employee.service');


async function createEmployee(req, res, next) {
  
    const employeeExists = await employeeService.checkIfEmployeeExist(req.body.employee_email);
    if (employeeExists) {
        return res.status(400).json({ message: 'Employee already exists' });
    }else{
        try {

            const createEmployee= await employeeService.createEmployee(req.body);

            if (createEmployee) {
                res.status(200).json({ success: "true" });
            }else{
                res.status(400).json({error: "Faild to add employee" });
            }
            
        } catch (error) {
            res.status(400).json({ error: "something went wrong" });
        }
    }
}
async function getEmployees(req,res,next){
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        
        const employees = await employeeService.getEmployees(page, limit);
        res.status(200).json({
            totalEmployees:employees.total,
            page:page,
            limit:limit,
            employees:employees.rows
            
        });
    } catch (error) {
        res.status(400).json({ error: "something went wrong" });
    }

}

module.exports = {createEmployee,getEmployees}
