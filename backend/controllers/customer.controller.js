const customerService = require('../services/customer.service');



async function createCustomer(req,res,next){

    const customerExists = await customerService.checkIfCustomerExist(req.body.customer_email);
    if (customerExists) {
        return res.status(400).json({ message: 'Customer already exists' });
    }else{
        try {
            const createCustomer= await customerService.createCustomer(req.body);

            if (createCustomer) {
                res.status(200).json({ success: "true" });
            }else{
                res.status(400).json({error: "Faild to add customer" });
            }
            
        } catch (error) {
            res.status(400).json({ error: "something went wrong" });
        }
    }
}

module.exports={createCustomer}