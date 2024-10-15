const {query}=require("../config/db.config");
const { get } = require("../routes/vehicle.routes");

async function getVehicleBySerial(serial){
    const sql="SELECT * FROM customer_vehicle_info WHERE vehicle_serial=? AND active_vehicle=1";
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
            vehicle_color,
            active_vehicle
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?);
    `;

    const {customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color,active_vehicle} = vehicle;

    const rows = await query(sql, [customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color,active_vehicle]);

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

async function updateVehicle(vehicle){

    const sql = `
    UPDATE customer_vehicle_info 
    SET 
        
        vehicle_year=?, 
        vehicle_make=?, 
        vehicle_model=?, 
        vehicle_type=?, 
        vehicle_mileage=?, 
        vehicle_tag=?, 
        vehicle_serial=?, 
        vehicle_color=?,
        active_vehicle=?
    WHERE vehicle_id=?;
`;
const { vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color,active_vehicle,vehicle_id} = vehicle;

try {
    const rows = await query(sql, [vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color,active_vehicle,vehicle_id]);

    if(rows.affectedRows === 1){
        return true;
        
    }else{
        return false;
    }
    
} catch (error) {
    console.log("Error in updateVehicle service",error);
    throw new Error(error.message);
    
}
}

async function getVehicleByCustomerId(customer_id){
    const sql="SELECT * FROM customer_vehicle_info WHERE customer_id=? AND active_vehicle=1";
    const rows=await query(sql,customer_id);

    if(rows && rows.length>0){
        return rows;
    }else{
        return false;
    }
    
    return rows;
}
module.exports={
    getVehicleBySerial,
    createVehicle,getVehicleId,updateVehicle,getVehicleByCustomerId
}