
const serviceService = require('../services/service.service');

async function createService(req, res, next) {

    try {
        const serviceExists = await serviceService.checkIfServiceExist(req.body.service_name);

        if (serviceExists) {
            return res.status(400).json({ message: 'Service already exists' });}

        const createService = await serviceService.createService(req.body);


        if (createService && createService.status === "true") {
            res.status(200).json({ success: "true" });
        } else {
            res.status(400).json({ error: "Faild to add service" });
        }
        
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ error: "something went wrong" });
    }
}

module.exports = {
    createService
}