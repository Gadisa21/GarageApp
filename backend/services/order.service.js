const { create } = require('domain');
const {query,getConnection} = require('../config/db.config');

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

async function getOrders(page,limit) {

    const offset=(page-1)*limit;

    try {
        const sql=`
        SELECT 
            o.order_id,
            o.employee_id,
            o.customer_id,
            o.vehicle_id,
            o.order_date,
            o.active_order,
            o.order_hash,
            oi.order_total_price,
            os.order_status
        FROM 
            orders o
        LEFT JOIN 
            order_info oi ON o.order_id = oi.order_id
        LEFT JOIN 
            order_status os ON o.order_id = os.order_id
        LIMIT ? OFFSET ?;
    `;

    const orders=await query(sql,[limit,offset]);

    if(orders.length>0){
        return orders;}else{
            return false;
        }
        
    } catch (error) {
        console.log('Error getting orders',error.message);
        throw new Error('Error getting orders');

        
    }



}

async function getOrderByHash(hash){
    try {
        const sql=`
        SELECT 
            o.order_id,
            o.employee_id,
            o.customer_id,
            o.vehicle_id,
            o.order_date,
            o.active_order,
            o.order_hash,
            oi.order_total_price,
            oi.additional_request,
            oi.additional_requests_completed,
            os.order_status
        FROM 
            orders o
        LEFT JOIN 
            order_info oi ON o.order_id = oi.order_id
        LEFT JOIN 
            order_status os ON o.order_id = os.order_id
        WHERE 
            o.order_hash = ?;
    `;

    

    const [order]=await query(sql,[hash]);
    //check if order performed is not successful

        if(order && order.length<1){
            return false;

        }

        const sql2= `SELECT 
        os.order_service_id,
        os.service_id,
        os.service_completed,
        cs.service_name,
        cs.service_description
    FROM 
        order_services os
    LEFT JOIN 
        common_services cs ON os.service_id = cs.service_id
    WHERE 
        os.order_id = ?;
`;

const services=await query(sql2,[order.order_id]);

order.order_services=services;

return order;


    
        
    } catch (error) {
        console.log('Error getting order by hash',error.message);
        throw new Error('Error getting order by hash');

        
    }
}
module.exports = {createOrder,getOrders,getOrderByHash};