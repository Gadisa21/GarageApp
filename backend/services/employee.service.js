
const {query,getConnection}=require("../config/db.config")
const bcrypt=require("bcrypt")

async function checkIfEmployeeExist(email){
    const sql="SELECT * FROM employee WHERE employee_email=?"
    const [rows]=await query(sql,[email])
    // console.log("rows",rows)
    if(rows){
        return true
    }else{
        return false
    }
}



async function createEmployee(employee) {
    const createdEmployee = {};
    const connection = await getConnection();  // Get a connection from the pool
    try {
        // Start transaction
        await connection.beginTransaction();

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

        // First query: Insert into employee table
        const query1 = "INSERT INTO employee(employee_email, active_employee) VALUES(?,?)";
        const [rows1] = await connection.query(query1, [employee.employee_email,1]);

        if (rows1.affectedRows !== 1) {
            throw new Error('Failed to insert employee.');
        }

        const employeeId = rows1.insertId;

        // Second query: Insert into employee_info table
        const query2 = "INSERT INTO employee_info(employee_id, employee_first_name, employee_last_name, employee_phone) VALUES(?,?,?,?)";
        const [rows2] = await connection.query(query2, [employeeId, employee.employee_first_name, employee.employee_last_name, employee.employee_phone]);

        if (rows2.affectedRows !== 1) {
            throw new Error('Failed to insert employee info.');
        }

        // Third query: Insert into employee_pass table
        const query3 = "INSERT INTO employee_pass(employee_id, employee_password_hashed) VALUES(?,?)";
        const [rows3] = await connection.query(query3, [employeeId, hashedPassword]);

        if (rows3.affectedRows !== 1) {
            throw new Error('Failed to insert employee password.');
        }

        // Fourth query: Insert into employee_role table
        const query4 = "INSERT INTO employee_role(employee_id, company_role_id) VALUES(?,?)";
        const [rows4] = await connection.query(query4, [employeeId, employee.company_role_id]);

        if (rows4.affectedRows !== 1) {
            throw new Error('Failed to insert employee role.');
        }

        // If all queries succeeded, commit the transaction
        await connection.commit();

        

        // Store employee ID in createdEmployee object
        createdEmployee.employeeId = employeeId;
    } catch (error) {
        // If any query fails, rollback the transaction
        await connection.rollback();
        console.error('Transaction failed: ', error);
        return false;
    } finally {
        // Release the connection back to the pool
        connection.release();
    }

    return createdEmployee;
}

async function getEmployeeByEmail(email){

    const sql = `
    SELECT 
        e.employee_id, 
        e.employee_email, 
        e.active_employee, 
        e.added_date,
        ei.employee_first_name, 
        ei.employee_last_name, 
        ei.employee_phone, 
        ep.employee_password_hashed, 
        er.company_role_id
    FROM 
        employee e
    JOIN 
        employee_info ei ON e.employee_id = ei.employee_id
    JOIN 
        employee_pass ep ON e.employee_id = ep.employee_id
    JOIN 
        employee_role er ON e.employee_id = er.employee_id
    WHERE 
        e.employee_email = ?;
`;
const empoyeeData=await query(sql,[email])


return empoyeeData


}

async function getEmployees(page, limit) {
    try {

        const offset = (page - 1) * limit;
        const sql = `
        SELECT 
            e.employee_id, 
            e.employee_email, 
            e.active_employee, 
            e.added_date,
            ei.employee_first_name, 
            ei.employee_last_name, 
            ei.employee_phone, 
            er.company_role_id
        FROM 
            employee e
        JOIN 
            employee_info ei ON e.employee_id = ei.employee_id
        JOIN 
            employee_role er ON e.employee_id = er.employee_id
        LIMIT ?, ?;`;

    const sql2=`SELECT COUNT(*) as total FROM employee`
    const [{total}]=await query(sql2)

    const rows = await query(sql, [offset, limit]);

       return {rows,total};
        
    } catch (error) {
       throw new Error("Something went wrong")
        
    }
}

async function getEmployeeById(id) {
    try {
        const sql = `
        SELECT 
            e.employee_id, 
            e.employee_email, 
            e.active_employee, 
            e.added_date,
            ei.employee_first_name, 
            ei.employee_last_name, 
            ei.employee_phone, 
            er.company_role_id
        FROM 
            employee e
        JOIN 
            employee_info ei ON e.employee_id = ei.employee_id
        JOIN 
            employee_role er ON e.employee_id = er.employee_id
        WHERE 
            e.employee_id = ?;
        `;

        
        const employeeData = await query(sql, [id]);

      
        return employeeData;
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        throw new Error("Something went wrong");
    }
}

async function updateEmployee(employee) {
    const updatedEmployee = {};
    const connection = await getConnection();  // Get a connection from the pool
    try {
        // Start transaction
        await connection.beginTransaction();

        // First query: Update employee table
        const query1 = "UPDATE employee SET employee_email = ?, active_employee = ? WHERE employee_id = ?";
        const [rows1] = await connection.query(query1, [employee.employee_email, employee.active_employee, employee.employee_id]);

        if (rows1.affectedRows !== 1) {
            throw new Error('Failed to update employee.');
        }

        // Second query: Update employee_info table
        const query2 = "UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? WHERE employee_id = ?";
        const [rows2] = await connection.query(query2, [employee.employee_first_name, employee.employee_last_name, employee.employee_phone, employee.employee_id]);

        if (rows2.affectedRows !== 1) {
            throw new Error('Failed to update employee info.');
        }

        // Third query: Update employee_role table
        const query3 = "UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?";
        const [rows3] = await connection.query(query3, [employee.company_role_id, employee.employee_id]);

        if (rows3.affectedRows !== 1) {
            throw new Error('Failed to update employee role.');
        }

        // If all queries succeeded, commit the transaction
        await connection.commit();

        // Store employee ID in updatedEmployee object
        updatedEmployee.employeeId = employee.employee_id;
    } catch (error) {
        // If any query fails, rollback the transaction
        await connection.rollback();
        console.error('Transaction failed: ', error);
        return false;
    } finally {
        // Release the connection back to the pool
        connection.release();
    }

    return updatedEmployee;
}

async function deleteEmployee(id){

    const connection=await getConnection()

    if(!id){
        return false
    }

    try {
  await connection.beginTransaction()

const sql1="DELETE FROM `employee_role` WHERE `employee_id` = ?"

const sql2="DELETE FROM `employee_info` WHERE `employee_id` = ?"

const sql3="DELETE FROM `employee_pass` WHERE `employee_id` = ?"

const sql4="DELETE FROM `employee` WHERE `employee_id` = ?"

   const [row1]=await connection.query(sql1,[id])
   
    if(row1.affectedRows!==1){
        throw new Error("Failed to delete employee role")
    }



 const [row2]=await connection.query(sql2,[id])

    if(row2.affectedRows!==1){
        throw new Error("Failed to delete employee info")
    }

 const [row3]=await connection.query(sql3,[id])

 if(row3.affectedRows!==1){
    throw new Error("Failed to delete employee pass")}

const [row4]=await connection.query(sql4,[id])

if(row4.affectedRows!==1){
    throw new Error("Failed to delete employee")
}

await connection.commit()

return true

    
    } catch (error) {
        
        await connection.rollback()
        return false
    } 
    finally {
        connection.release();
    }
    

}


module.exports={checkIfEmployeeExist,createEmployee,getEmployeeByEmail,getEmployees,getEmployeeById,updateEmployee,deleteEmployee}    // Export the functions
