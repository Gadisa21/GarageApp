const {query}=require("../config/db.config");
const { get } = require("../routes/vehicle.routes");

async function getVehicleBySerial(serial){
    //here edit the sql as per like i added active_vehicle colunm so what you check from the database is that the vehicle is active or not so like change the sql to consider that the active status mustb 1 to compare by serial number i dont want vehicle info if the active status of that vehicle is 0
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

module.exports={
    getVehicleBySerial,
    createVehicle,getVehicleId
}