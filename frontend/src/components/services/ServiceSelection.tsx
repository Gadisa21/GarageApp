"use client"
import { useGetServicesQuery } from "@/features/api/apiSlice"

interface ServiceSelectionProps {
    selectedServices: number[]
    onServiceSelect: (id: number) => void
}

function ServiceSelection({ selectedServices, onServiceSelect }: ServiceSelectionProps) {

  const { data,isLoading,error } = useGetServicesQuery()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  console.log("data",data)
  return (
    <div className="shadow-md rounded-sm  border border-gray-200 my-5  px-4 py-5">

      
<p className="text-2xl font-bold text-customBlue mb-2 ">
            Choose Service
          </p>
      
    {data?.services.map((service) => (
      <div
        key={service.service_id}
        className=" my-5 flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition"
      >
        <div>
          <h3 className="text-lg text-customBlue font-bold">{service.service_name}</h3>
          <p className="text-base text-gray-800">{service.service_description}</p>
        </div>
        <input
          type="checkbox"
          checked={selectedServices.includes(service.service_id)}
          onChange={() => onServiceSelect(service.service_id)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
        />
      </div>
    ))}
  </div>
  )
}

export default ServiceSelection