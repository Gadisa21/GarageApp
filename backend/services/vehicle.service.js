const {query}=require("../config/db.config");
const { get } = require("../routes/vehicle.routes");

async function getVehicleBySerial(serial){
    const sql="SELECT * FROM customer_vehicle_info WHERE vehicle_serial=?";
    const [rows]=await query(sql,serial);
    return rows;
}

async function createVehicle(vehicle){
    try {

        const sql = `
        INSERT INTO customer_vehicle_info (
            customer_id, 
            vehicle_year, 
            vehicle_make, 
            vehicle_model, 
            vehicle_type, 
            vehicle_mileage, 
            vehicle_tag, 
            vehicle_serial, 
            vehicle_color
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const {customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color} = vehicle;

    const rows = await query(sql, [customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color]);

    if(rows.affectedRows === 1){
        return true;
        
    }else{
        return false;
    } }
    catch (error) {
        console.log("Error in createVehicle service",error);
        throw new Error(error.message);
        
    }
}
async function getVehicleId(id){
    const sql="SELECT * FROM customer_vehicle_info WHERE vehicle_id=?";
    const [rows]=await query(sql,id);
    return rows;
}

module.exports={
    getVehicleBySerial,
    createVehicle,getVehicleId
}