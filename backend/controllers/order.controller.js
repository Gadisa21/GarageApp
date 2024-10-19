const { get } = require('../routes/order.routes');
const orderService = require('../services/order.service');

// Create and Save a new Order
async function createOrder(req, res) {
    try {
        const order = await orderService.createOrder(req.body);
        if(order) {
            res.status(201).json({
                status: 'true',
                message: 'Order created successfully',
            });
        }else{
            res.status(400).json({
                status: 'Fail',
                message: 'Order not created',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
             message: "Something went wrong" });
    }
}

async function getOrders(req, res) {

    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    try {
        const orders = await orderService.getOrders(page,limit);
        if(orders) {
            res.status(200).json({
                status: 'true',
                message: 'Orders fetched successfully',
                data: orders
            });
        }else{
            res.status(400).json({
                status: 'Fail',
                message: 'Orders not fetched',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
             message: "Something went wrong" });
    }
}

module.exports = {
    createOrder,getOrders
};