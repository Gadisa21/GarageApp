const mysql=require("mysql2/promise")

const dbconfig={
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
}

const pool=mysql.createPool(dbconfig)

async function getConnection(){
    const connection=await pool.getConnection()
    return connection
}

async function query(sql,params){

    const [rows, fields] = await pool.query(sql, params)
    console.log("Query result:", rows);
    return rows
}

module.exports={query,getConnection}