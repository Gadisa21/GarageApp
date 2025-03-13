const {query}=require("../config/db.config")


const getKPIs=async()=>{

    try {
        const sql=`SELECT 
    (SELECT COUNT(*) FROM customer_identifier) AS total_customers,
    (SELECT COUNT(*) FROM orders WHERE active_order = 1) AS active_orders,
    (SELECT SUM(order_total_price) FROM order_info) AS total_revenue;
`
const [kpis]=await query(sql);
console.log("KPI",kpis)
return kpis
        
    } catch (error) {
        console.log('Error getting KPIs',error.message);
        throw new Error('Error getting KPIs');
        
    }
}

const getOrderTrends=async()=>{

    try {

        const sql=`SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month, 
    COUNT(*) AS orders 
FROM orders 
GROUP BY month
ORDER BY month;
`

const orderTrends=await query(sql);

return orderTrends
        
    } catch (error) {
        throw new Error('Error getting order trends')
        
    }
}

const getRevenueBreakdown=async ()=>{

    try {
        const sql=`SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month, 
    SUM(order_total_price) AS revenue 
FROM orders 
JOIN order_info ON orders.order_id = order_info.order_id 
GROUP BY month
ORDER BY month;
`
const revenueBreakdown= await query(sql)
return revenueBreakdown
        
    } catch (error) {
        throw new Error("Error getting revenu breakdown")
        
    }
}

module.exports={ getKPIs, getOrderTrends, getRevenueBreakdown}