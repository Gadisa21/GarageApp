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

async function getCustomer(req,res,next){
    try {
        const customer = await customerService.getCustomer(req.params.id);
        if (customer) {
            res.status(200).json({
                success: "true",
                customer: customer});
        }else{
            res.status(400).json({ 
                status: "Fail",
                message: "Customer not found" });
        }
    } catch (error) {
        res.status(400).json({ 
            status: "Fail",
            message: "something went wrong" });
    }
}

async function getCustomers(req,res,next){
    
    try {
        const page=Number(req.query.page)
        const limit=Number(req.query.limit)

        const customers=await customerService.getCustomers(page,limit)

        if(customers){
            res.status(200).json({
                totalCustomers:customers.total,
                page:page,
                limit:limit,
                customers:customers.data
            }
        )
        }
        else{
            res.status(400).json({error:"Failed to get customers"})
        }
        
    } catch (error) {
        
        console.log(error.message)
        res.status(400).json({error:"Something went wrong"})
    }
    }

async function updateCustomer(req,res,next){
    try {
        const customer = await customerService.updateCustomer(req.body);

        if (customer) {
            res.status(200).json({ 
                status: "success",
                success: "true" });
        }else{
            res.status(400).json({
                status: "Fail",
                message: "Faild to update customer" });
        }
        
    } catch (error) {
        res.status(400).json({
            status: "Fail",
             message: "something went wrong" });
    }
}

async function searchCustomers(req,res,next){
   try {
    const {keyword}=req.query;
    if(!keyword){
        res.status(400).json({message:"Please provide a keyword"})
    }

    const customers=await customerService.searchCustomers(keyword)
    console.log("customer controller",customers)

    res.status(200).json({customers})

    
   } catch (error) {
    console.log(error.message)
    res.status(400).json({error:"Something went wrong"})
    
   }
}


module.exports={createCustomer,getCustomer,getCustomers,updateCustomer,searchCustomers}