"use client";
import { HiSearch } from "react-icons/hi";
import {
  useGetcustomersByKeywordQuery,
  useGetVehiclesByCustomerIdQuery,
  useCreateOrderMutation,
} from "@/features/api/apiSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Customer, vehicle, CreateOrderRequest } from "@/types";
import { skipToken } from "@reduxjs/toolkit/query/react";
import ServiceSelection from "@/components/services/ServiceSelection";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PulseLoader } from "react-spinners";

function Page() {
  const [keyword, setKeyword] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<vehicle | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const router = useRouter();
  const employee_id = useSelector((state: RootState) => state.auth.employee_id);

  const handleServiceSelection = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Get customers by keyword
  const {
    data: customers,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useGetcustomersByKeywordQuery({ keyword }, { skip: !keyword });

  // Get vehicles by customer id
  const customerId = selectedCustomer?.customer_id;
  const {
    data: vehicles,
    isLoading: isVehicleLoading,
    error: vehicleError,
  } = useGetVehiclesByCustomerIdQuery(
    customerId ? { customer_id: customerId } : skipToken
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handlesSubmit = async () => {
    if (price <= 0) {
      setErrorMessage("Order price must be provided and greater than 0.");
      return;
    }

    if (selectedServices.length === 0 && !additionalRequest) {
      setErrorMessage("Please select at least one service or provide additional request.");
      return;
    }

    const newOrder: CreateOrderRequest = {
      employee_id: employee_id!,
      customer_id: selectedCustomer!.customer_id,
      vehicle_id: selectedVehicle?.vehicle_id!,
      order_total_price: price,
      additional_request: additionalRequest || undefined,
      order_services: selectedServices.map((service_id) => ({ service_id })),
    };

    try {
      await createOrder(newOrder).unwrap();
      router.push("/orders");
    } catch (error) {
      console.log("Failed to create order", error);
      setErrorMessage("Failed to create order. Please try again later.");
    }
  };

  return (
    <div className="md:mx-20 mx-4">
      <p className="text-4xl font-bold text-customBlue my-10">
        Create a new order
        <span className="inline-block ml-3 w-10 h-[2px] bg-customeRed"></span>
      </p>

      {/* Step 1: Search customer */}
      {!selectedCustomer && (
        <>
          <div className="relative">
            <input
              type="text"
              id="customer_name"
              className="w-full border border-gray-300 p-4 rounded-md pr-10"
              placeholder="Search for a customer using first name, lastname or email address"
              value={keyword}
              onChange={handleSearchChange}
            />
            <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {isCustomerLoading && <p>Loading...</p>}
          {customerError && <p>Error</p>}
          {customers?.customers && customers.customers.length > 0 ? (
            <div className="mt-5">
              <h2 className="text-2xl font-bold">Search Results:</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 mt-3">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border border-gray-300">First Name</th>
                      <th className="py-2 px-4 border border-gray-300">Last Name</th>
                      <th className="py-2 px-4 border border-gray-300">Email</th>
                      <th className="py-2 px-4 border border-gray-300">Phone Number</th>
                      <th className="py-2 px-4 border border-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.customers.map((customer) => (
                      <tr
                        key={customer.customer_id}
                        onClick={() => setSelectedCustomer(customer)}
                        className={`cursor-pointer ${
                          customer.customer_id % 2 ? "bg-gray-100" : ""
                        } hover:bg-gray-200`}
                      >
                        <td className="py-4 px-4 border border-gray-300">{customer.customer_first_name}</td>
                        <td className="py-4 px-4 border border-gray-300">{customer.customer_last_name}</td>
                        <td className="py-4 px-4 border border-gray-300">{customer.customer_email}</td>
                        <td className="py-4 px-4 border border-gray-300">{customer.customer_phone_number}</td>
                        <td className="py-4 px-4 border border-gray-300">
                          {customer.active_customer_status ? "Active" : "Inactive"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            keyword &&
            !isCustomerLoading && (
              <p className="mt-5 text-red-500">No customers found</p>
            )
          )}
        </>
      )}

      {/* Step 2: Select vehicle */}
      {selectedCustomer && !selectedVehicle && (
        <div className="mx-5">
          <div className="shadow-md rounded-sm border border-gray-200 mt-5 px-4 py-5">
            <p className="text-2xl font-bold text-customBlue mb-2">
              {selectedCustomer.customer_first_name} {selectedCustomer.customer_last_name}
            </p>
            <p className="mb-1 text-lg text-customBlue font-semibold">
              Email: <span className="text-gray-500">{selectedCustomer.customer_email}</span>
            </p>
            <p className="mb-1 text-lg text-customBlue font-semibold">
              Phone Number: <span className="text-gray-500">{selectedCustomer.customer_phone_number}</span>
            </p>
            <p className=" text-lg text-customBlue font-semibold">
              Active customer: <span className="text-gray-500">{selectedCustomer.active_customer_status ? "Yes" : "No"}</span>
            </p>
          </div>

          <p className="text-4xl font-bold text-customBlue my-10">
            Choose a vehicle
            <span className="inline-block ml-3 w-10 h-[2px] bg-customeRed"></span>
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 mt-3">
              {vehicles?.data && vehicles.data.length > 0 ? (
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
                    {vehicles.data.map((vehicle, index) => (
                      <tr
                        key={vehicle.vehicle_id}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className={`cursor-pointer ${index % 2 ? "bg-gray-100" : ""} hover:bg-gray-200`}
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
                <p className=" text-red-500 text-center p-4 font-semibold">No vehicles found</p>
              )}
            </table>
          </div>
        </div>
      )}

      {/* Step 3: Show Selected Vehicle & Service Selection */}
      {selectedCustomer && selectedVehicle && (
        <div className="mx-5">
          <div className="shadow-md rounded-sm border border-gray-200 mt-5 px-4 py-5">
            <p className="text-2xl font-bold text-customBlue mb-2">
              {selectedCustomer.customer_first_name} {selectedCustomer.customer_last_name}
            </p>
            <p className="mb-1 text-lg text-customBlue font-semibold">
              Email: <span className="text-gray-500">{selectedCustomer.customer_email}</span>
            </p>
            <p className="mb-1 text-lg text-customBlue font-semibold">
              Phone Number: <span className="text-gray-500">{selectedCustomer.customer_phone_number}</span>
            </p>
            <p className=" text-lg text-customBlue font-semibold">
              Active customer: <span className="text-gray-500">{selectedCustomer.active_customer_status ? "Yes" : "No"}</span>
            </p>
          </div>
          <div className="shadow-md rounded-sm border border-gray-200 mt-5 px-4 py-5">
            <p className="text-2xl font-bold text-customBlue mb-2">{selectedVehicle.vehicle_model}</p>
            <p className="mb-1 text-lg text-customBlue font-semibold">Vehicle color: {selectedVehicle.vehicle_color}</p>
            <p className="mb-1 text-lg text-customBlue font-semibold">
              Vehicle tag: <span className="text-gray-500">{selectedVehicle.vehicle_tag}</span>
            </p>
            <p className="mb-1 text-lg text-customBlue font-semibold">
              Vehicle year: <span className="text-gray-500">{selectedVehicle.vehicle_year}</span>
            </p>
            <p className=" text-lg text-customBlue font-semibold">
              Vehicle mileage: <span className="text-gray-500">{selectedVehicle.vehicle_mileage}</span>
            </p>
            <p className=" text-lg text-customBlue font-semibold">
              Vehicle serial: <span className="text-gray-500">{selectedVehicle.vehicle_serial}</span>
            </p>
          </div>
          <ServiceSelection selectedServices={selectedServices} onServiceSelect={handleServiceSelection} />
          <div className="shadow-md rounded-sm border border-gray-200 my-5 px-4 py-5">
            <p className="text-4xl font-bold text-customBlue my-10">
              Additional request
              <span className="inline-block ml-3 w-10 h-[2px] bg-customeRed"></span>
            </p>
            <textarea
              value={additionalRequest}
              onChange={(e) => setAdditionalRequest(e.target.value)}
              placeholder="Enter any additional requests..."
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
              rows={3}
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value.replace(/\D/, "")))}
              placeholder="Enter price"
              className="w-full p-2 mt-5 border rounded-md focus:ring focus:ring-blue-300 appearance-none"
            />
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <button
              className=" px-10 py-4 mt-5 text-white bg-customeRed rounded-md"
              onClick={handlesSubmit}
              disabled={isLoading}
            >
              {isLoading ? <PulseLoader size={8} color="#fff" /> : "Create Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
