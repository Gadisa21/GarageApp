const { get } = require("http");
const {query,getConnection}=require("../config/db.config")
const crypto=require('crypto')

const Jwt_secret = process.env.JWT_SECRET; //use this secret to hash the email


async function checkIfCustomerExist(email){
    const sql="SELECT * FROM customer_identifier WHERE customer_email=?"
    const result=await query(sql,[email])

    return result.length>0
}

async function createCustomer(customer){

    const {customer_first_name,customer_last_name,customer_email,customer_phone_number,active_customer_status}=customer

    //get connection from pool
    const connection=await getConnection()

    try {
        //start transaction
        await connection.beginTransaction()

        //generate hash for the email
        const newHash=crypto.createHash('sha256').update(customer_email + Jwt_secret ).digest('hex')


        const sql1="INSERT INTO customer_identifier (customer_email,customer_phone_number,customer_hash) VALUES (?,?,?)"

        //insert into customer_info
        const [rows1]=await connection.query(sql1,[customer_email,customer_phone_number,newHash])

        //check if the insert was successful
        if(rows1.affectedRows!==1){
            throw new Error("Failed to insert into customer_identifier")
        }
        
        const customer_id=rows1.insertId

        //insert into customer_info
        const sql2="INSERT INTO customer_info (customer_id,customer_first_name,customer_last_name,active_customer_status) VALUES (?,?,?,?)"

        const [rows2]= await connection.query(sql2,[customer_id,customer_first_name,customer_last_name,active_customer_status])

        //check if the insert was successful
        if(rows2.affectedRows!==1){
            throw new Error("Failed to insert into customer_info")
        }

        //commit the transaction
        await connection.commit()

        return true

        
    } catch (error) {
        //rollback the transaction
        await connection.rollback()
        console.log("Error creating customer",error.message)
        throw new Error("Error creating customer")
        
    } finally{
        //release the connection
        connection.release()
    }
    

}

async function getCustomer(customer_id){
    
    const sql=`SELECT 
     ci.customer_id,
    ci.customer_email,
    ci.customer_phone_number,
    ci.customer_added_date,
    ci.customer_hash,
    ci_info.customer_first_name,
    ci_info.customer_last_name,
    ci_info.active_customer_status
    FROM customer_identifier ci
    JOIN customer_info ci_info ON ci.customer_id=ci_info.customer_id
    WHERE ci.customer_id=?`

    try {
        
        const rows=await query(sql,[customer_id])

        if(rows && rows.length>0){
            return rows[0]}
            else{
                return null
            }
    } catch (error) {
        console.log("Error getting customer",error.message)
        throw new Error("Error getting customer")
        
    }
}

async function getCustomers(page,limit){
    const sql=`SELECT 
    ci.customer_id,
    ci.customer_email,
    ci.customer_phone_number,
    ci.customer_added_date,
    ci.customer_hash,
    ci_info.customer_first_name,
    ci_info.customer_last_name,
    ci_info.active_customer_status
    FROM customer_identifier ci
    JOIN customer_info ci_info ON ci.customer_id=ci_info.customer_id
    LIMIT ?,?`
    const sql2=`SELECT COUNT(*) as total FROM customer_identifier`

    const offset=(page-1)*limit

    try {
        const [{total}]=await query(sql2)
        const rows=await query(sql,[offset,limit])


        return {total,data:rows}
        
    } catch (error) {
        console.log("Error getting customers",error.message)
        throw new Error("Error getting customers")
        
    }
}

module.exports={
    checkIfCustomerExist,
    createCustomer,getCustomer,getCustomers
}