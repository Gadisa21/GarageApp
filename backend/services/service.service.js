const {query,getConnection}=require('../config/db.config');
const { get } = require('../routes/service.routes');

async function checkIfServiceExist(service_name){

    const normalizedServiceName = service_name.trim().toLowerCase();
    
    const sql="SELECT COUNT(*) as count FROM common_services WHERE LOWER(TRIM(service_name))=?"

    try {

        const [result]=await query(sql,[normalizedServiceName]);
        

        if(result.count>0){
            return true;
        }else{
            return false;
        }
        
    } catch (error) {
        
        console.log("error checking if service exists",error);
        throw new Error(error.message)
    }


}

async function createService(serviceData){
    const {service_name,service_description}=serviceData;

    const response={}

    const sql="INSERT INTO common_services (service_name,service_description) VALUES(?,?)"

    try {
        const result=await query(sql,[service_name,service_description]);
        if(result.affectedRows>0){
             response.status="true";
             return response
        }else{
            throw new Error("Failed to create service") 
        }
        
    } catch (error) {
        console.log("error creating service",error);
        throw new Error("Failed to create service")
    }
}

async function getAllServices(){
    const sql="SELECT * FROM common_services"

    try {

        const services=await query(sql);

        if(services && services.length>0){
            return services}
            else{
                return false
            }
        
    } catch (error) {
        console.log("error getting all services",error);
        throw new Error("Failed to get services")
    }
}

async function getServiceById(id){
    const sql="SELECT * FROM common_services WHERE service_id=?"

    if(isNaN(id)){
        throw new Error("Invalid id")
    }

    try {
        const service=await query(sql,[id]);

        if(service && service.length>0){
            return service[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log("error getting service by id",error);
        throw new Error("Failed to get service")
    }
}

async function updateService(serviceData){

    const {service_id,service_name,service_description}=serviceData;

    const sql="UPDATE common_services SET service_name=?,service_description=? WHERE service_id=?"

    try {
        const result=await query(sql,[service_name,service_description,service_id]);

        if(result.affectedRows>0){
            return {status:"true"}
        }else{
            throw new Error("Failed to update service")
        }
        
    } catch (error) {
        console.log("error updating service",error);
        throw new Error("Failed to update service")
    }
}

async function deleteService(id){

    if(isNaN(id)){
        throw new Error("Invalid id")
    }

    try {
        const sql="DELETE FROM common_services WHERE service_id=?";

        const result=await query(sql,[id]);

        if(result.affectedRows>0){
            return {status:"true"}
        }else{
            throw new Error("Failed to delete service")

        }
    } catch (error) {
        
        console.log("error deleting service",error);
        throw new Error("Failed to delete service")

    }
}


module.exports={ createService,checkIfServiceExist,getAllServices,getServiceById,updateService,deleteService}