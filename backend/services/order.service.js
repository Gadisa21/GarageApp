const { create } = require('domain');
const {getConnection} = require('../config/db.config');

const crypto = require('crypto');
const Jwt_secret=process.env.JWT_SECRET


async function createOrder(order) {
    const connection=await getConnection()

    const order_hash=crypto.createHash('sha256').update(order.order_id+Jwt_secret).digest('hex')

    try {
        await connection.beginTransaction();

        const sql1='INSERT INTO orders (employee_id, customer_id,vehicle_id, active_order,order_hash) VALUES (?,?,?,?,?)';
        const [result1]=await connection.query(sql1,[order.employee_id,order.customer_id,order.vehicle_id,1,order_hash]);
        if(result1.affectedRows!==1){
            throw new Error('Failed to insert into orders');

        }
        const order_id=result1.insertId;
        const sql2='INSERT INTO order_info (order_id,order_total_price,additional_request,additional_requests_completed) VALUES (?,?,?,?)';

        const [result2]=await connection.query(sql2,[order_id,order.order_total_price,order.additional_request,order.additional_requests_completed]);
        
        if(result2.affectedRows!==1){
            throw new Error('Failed to insert into order_info');
        }

        const sql3="INSERT INTO order_services (order_id,service_id,service_completed) VALUES (?,?,?)";

        for(let i=0;i<order.order_services.length;i++){
            const [result3]=await connection.query(sql3,[order_id,order.order_services[i].service_id,0]);
            if(result3.affectedRows!==1){
                throw new Error('Failed to insert into order_services');
            }
        }

        const sql4="INSERT INTO order_status (order_id,order_status) VALUES (?,?)";
        const [result4]=await connection.query(sql4,[order_id,order.order_completed]);
        if(result4.affectedRows!==1){
            throw new Error('Failed to insert into order_status');
        }

        await connection.commit();

        return true;
        
    } catch (error) {
        connection.rollback();
        console.log('Error creating order',error.message);
        return false;
        
    }finally{
        connection.release();
    }
}

module.exports = {createOrder};