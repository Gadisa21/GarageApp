const {query,getConnection}=require('../config/db.config')

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

module.exports={ createService,checkIfServiceExist,getAllServices}