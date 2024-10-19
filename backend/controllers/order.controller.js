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

module.exports = {
    createOrder
};