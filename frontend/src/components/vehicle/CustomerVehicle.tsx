"use client"
import { useState } from "react"
import { vehicle } from "@/types"
import { set } from "react-hook-form"
import { useForm,SubmitHandler } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { useAddVehicleMutation } from "@/features/api/apiSlice";


interface CustomerVehicleProps {
  vehicles?: vehicle[]
  customer_id:number
}

type FormFields= {
  vehicle_year:string
  vehicle_make:string
  vehicle_model:string
  vehicle_type:string
  vehicle_color:string
  vehicle_mileage:string
  vehicle_tag:string
  vehicle_serial:string
  
}

function CustomerVehicle({ vehicles,customer_id }: CustomerVehicleProps) {

  const [showForm, setShowForm] = useState(false)
  const [success, setSuccess] = useState(false)
const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<FormFields>()

const [addVehicle,{error}]=useAddVehicleMutation()

const removeForm=()=>{
  setShowForm(false)
  setSuccess(false)
  reset()
  
}

    const onSubmit:SubmitHandler<FormFields>=async(data)=>{
      try {
        setSuccess(false);

        const {vehicle_color,vehicle_make,vehicle_mileage,vehicle_model,vehicle_serial,vehicle_tag,vehicle_type,vehicle_year}=data
        
      const response=await addVehicle({customer_id,vehicle_color,vehicle_make,vehicle_mileage,vehicle_model,vehicle_serial,vehicle_tag,vehicle_type,vehicle_year,active_vehicle:1}).unwrap()
 

    setSuccess(true)
  

    
      } catch (error) {
        setSuccess(false);
        
      }
    }
 
 
  return (
    <div className="px-4 py-5 md:flex gap-10 ">
      <div className="hidden rounded-full w-24 h-24 bg-customeRed md:flex items-center justify-center text-white font-semibold text-2xl">
        Cars
      </div>
      <div className="flex-grow">
        <p className="text-2xl font-bold text-customBlue mb-2">
          Vehicles
        </p>

        <div className="overflow-x-auto w-full max-w-full">
          <table className="min-w-full bg-white border border-gray-200 mt-3">
            {vehicles && vehicles.length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th className="py-2 px-4 border border-gray-300">Year</th>
                    <th className="py-2 px-4 border border-gray-300">Make</th>
                    <th className="py-2 px-4 border border-gray-300">Model</th>
                    <th className="py-2 px-4 border border-gray-300">Tag</th>
                    <th className="py-2 px-4 border border-gray-300">Serial</th>
                    <th className="py-2 px-4 border border-gray-300">Color</th>
                    <th className="py-2 px-4 border border-gray-300">Mileage</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle, index) => (
                    <tr
                      key={vehicle.vehicle_id}
                      className={`cursor-pointer ${
                        index % 2 ? "bg-gray-100" : ""
                      } hover:bg-gray-200`}
                    >
                      <td className="py-4 px-4 border border-gray-300">{vehicle.vehicle_year}</td>
                      <td className="py-4 px-4 border border-gray-300">{vehicle.vehicle_make}</td>
                      <td className="py-4 px-4 border border-gray-300">{vehicle.vehicle_model}</td>
                      <td className="py-4 px-4 border border-gray-300">{vehicle.vehicle_tag}</td>
                      <td className="py-4 px-4 border border-gray-300">{vehicle.vehicle_serial}</td>
                      <td className="py-4 px-4 border border-gray-300">{vehicle.vehicle_color}</td>
                      <td className="py-4 px-4 border border-gray-300">{vehicle.vehicle_mileage}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <div className="shadow-2xl">
                <p className="text-red-500 text-center p-4 font-semibold">No vehicles found</p>
              </div>
            )}
          </table>
        </div>

       <div className={`relative shadow-full max-w-[700px] p-4 md:p-10 mt-10 ${showForm?'block':'hidden'}`}>
        <button className="bg-customeRed text-white absolute top-0 right-0  p-2  w-8 h-8 flex items-center justify-center translate-x-1/2 -translate-y-1/2" onClick={()=>removeForm()}>X</button>
      <p className="text-4xl font-bold text-customBlue ">
        Add a new vehicle
        <span className=" inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
      </p>
      <form className='mt-10' onSubmit={handleSubmit(onSubmit)}>
        <input {...register("vehicle_year",{required:"Vehicle year is required"})} className='block w-full sm:w-4/5 p-3 mb-4 border border-gray-300  rounded' placeholder='Vehicle year' />
        {errors.vehicle_year && <p className='text-red-500'>{errors.vehicle_year.message}</p>}
        <input {...register("vehicle_make",{required:"Vehcile make is required",minLength:{value:3,message:"Vehicle make must be at least 3 characters"}})} className='block w-full sm:w-4/5 p-3 mb-4 border border-gray-300  rounded ' placeholder='Vehcile make'  type='text'/>
        {errors.vehicle_make && <p className='text-red-500'>{errors.vehicle_make.message}</p>}
        <input {...register("vehicle_model",{required:"Vehicle model is required"})} className='block w-full sm:w-4/5 p-3 mb-4 border border-gray-300  rounded' placeholder='Vehicle model'  type='text'/>
        {errors.vehicle_model && <p className='text-red-500'>{errors.vehicle_model.message}</p>}
        <input {...register("vehicle_type",{required:"Vehicle type is required"})} className='block w-full sm:w-4/5 p-3 mb-4 border border-gray-300  rounded' placeholder='Vehicle type'  type='text'/>
        {errors.vehicle_type && <p className='text-red-500'>{errors.vehicle_type.message}</p>}
        <input {...register("vehicle_color",{required:"Vehicle color is required"})} className='block w-full sm:w-4/5 p-3 mb-4 border border-gray-300  rounded' placeholder='Vehicle color'  type='text'/>
        {errors.vehicle_color && <p className='text-red-500'>{errors.vehicle_color.message}</p>}
        <input {...register("vehicle_mileage",{required:"Vehicle mileage is required"})} className='block w-full sm:w-4/5 p-3 mb-4 border border-gray-300  rounded' placeholder='Vehicle mileage'  type='text'/>
        {errors.vehicle_mileage && <p className='text-red-500'>{errors.vehicle_mileage.message}</p>}
        <input {...register("vehicle_tag",{required:"Vehicle tag is required"})} className='block w-full sm:w-4/5 p-3 mb-4 border border-gray-300  rounded' placeholder='Vehicle tag'  type='text'/>
        {errors.vehicle_tag && <p className='text-red-500'>{errors.vehicle_tag.message}</p>}
        <input {...register("vehicle_serial",{required:"Vehicle serial is required"})} className='block w-full sm:w-4/5 p-3 mb-4 border border-gray-300  rounded' placeholder='Vehicle serial'  type='text'/>
        {errors.vehicle_serial && <p className='text-red-500'>{errors.vehicle_serial.message}</p>}
        {success && <p className='text-green-500 mb-5'>Vehicle added successfully</p>}
        {error && (
  <p className='text-red-500'>
    {
      'status' in error && typeof error.data === 'object' && error.data !== null && 'message' in error.data
        ? (error.data as { message: string }).message // Safely access the message
        : 'An unknown error occurred'
    }
  </p>
)}
        <button disabled={isSubmitting} className='bg-customeRed px-5 py-3 text-white font-semibold ' type='submit'>{isSubmitting?<PulseLoader size={8} color="#fff"  />:"ADD VEHICLE"}</button>
       
      </form>
    </div>
          
          <button className={`bg-customeRed  text-white py-4 px-7  mt-4 rounded-md ${showForm?'hidden':'block'}`} onClick={()=>setShowForm(true)}>
            Add New Vehicle
          </button>

        </div>
      </div>
  )
}

export default CustomerVehicle