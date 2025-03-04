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
        
            res.status(200).json({
                status: 'true',
                message: 'Orders fetched successfully',
                data: orders
            });
        
        
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
             message: "Something went wrong" });
    }
}

async function getOrderByHash(req, res) {
    const hash = req.params.hash;

    try {
        const order = await orderService.getOrderByHash(hash);
        if(order) {
            res.status(200).json({
                status: 'true',
                message: 'Order fetched successfully',
                data: order
            });
        }else{
            res.status(400).json({
                status: 'Fail',
                message: 'Order not fetched'}
            )}
             } catch (error) {
        res.status(500).json({
            status: 'Fail',
             message: "Something went wrong" });
        
    }
   
}

async function updateOrder(req, res) {
    try {
        const order = await orderService.updateOrder(req.body);
        if(order) {
            res.status(201).json({
                status: 'true',
                message: 'Order updated successfully',
            });
        }else{
            res.status(400).json({
                status: 'Fail',
                message: 'Order not updated',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
             message: "Something went wrong" });
    }
}

async function getCustomerOrders(req, res) {
    const id = req.params.id;

    try {
        const orders = await orderService.getCustomerOrders(id);
        if(orders) {
            res.status(200).json({
                status: 'true',
                message: 'Orders fetched successfully',
                data: orders
            });
        }else{
            res.status(400).json({
                status: 'Fail',
                message: 'Orders not fetched'}
            )}
             } catch (error) {
        res.status(500).json({
            status: 'Fail',
             message: "Something went wrong" });
        
    }
   
}

module.exports = {
    createOrder,getOrders,getOrderByHash,updateOrder,getCustomerOrders
};