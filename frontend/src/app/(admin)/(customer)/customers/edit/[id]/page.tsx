"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useGetcustomerByIdQuery,
  useUpdateCutomerInfoMutation,
} from "@/features/api/apiSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { customerUpdateForm } from "@/types";
import { PulseLoader } from "react-spinners";


function page() {
  const { id } = useParams();
  const customer_id = parseInt(id as string);

  const {
    data: customer,
    error,
    isLoading,
  } = useGetcustomerByIdQuery({ customer_id });

  const [updateCustomerInfo,{isLoading:isUpdating}] = useUpdateCutomerInfoMutation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<customerUpdateForm>({
    defaultValues: {
      customer_email: "",
      customer_first_name: "",
      customer_last_name: "",
      customer_phone_number: "",
      active_customer_status: false,
    },
  });

  

  useEffect(() => {
    console.log(customer?.data?.customer);
    if (customer?.data && customer.data.customer) {
      setValue("customer_email", customer.data.customer.customer_email);
      setValue(
        "customer_first_name",
        customer.data.customer.customer_first_name
      );
      setValue("customer_last_name", customer.data.customer.customer_last_name);
      setValue(
        "customer_phone_number",
        customer.data.customer.customer_phone_number
      );
      setValue(
        "active_customer_status",
        customer.data.customer.active_customer_status?true:false
      );
    }
  }, [customer, setValue]);


  const onSubmit: SubmitHandler<customerUpdateForm> = async (data) => {
    try {

      await updateCustomerInfo({...data,customer_id,active_customer_status:data.active_customer_status?1:0});
      alert("Customer updated successfully")
    } catch (error) {
      alert("Failed to update customer")
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-10 mt-10">
      {customer?.data && customer.data.customer ? (
        <>
          <p className="text-4xl font-bold text-customBlue ">
            Edit {customer.data.customer.customer_first_name}{" "} {customer.data.customer.customer_last_name}
            <span className=" inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
          </p>

          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("customer_email", {
                required: " Customer Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="block w-full sm:w-[50%] p-2 mb-4 border border-gray-300  rounded"
              placeholder=""
            />
            {errors.customer_email && (
              <p className="text-red-500">{errors.customer_email.message}</p>
            )}
            <input
              {...register("customer_first_name", {
                required: "Customer first name is required",
              })}
              className="block w-full sm:w-[50%] p-2 mb-4 border border-gray-300  rounded "
              placeholder=""
              type="text"
            />
            {errors.customer_first_name && (
              <p className="text-red-500">
                {errors.customer_first_name.message}
              </p>
            )}
            <input
              {...register("customer_last_name", {
                required: "Customer last name is required",
              })}
              className="block w-full sm:w-[50%] p-2 mb-4 border border-gray-300  rounded "
              placeholder=""
              type="text"
            />
            {errors.customer_last_name && (
              <p className="text-red-500">
                {errors.customer_last_name.message}
              </p>
            )}
            <input
              {...register("customer_phone_number", {
                required: "Customer phone number is required",
              })}
              className="block w-full sm:w-[50%] p-2 mb-4 border border-gray-300  rounded "
              placeholder=""
              type="text"
            />
            {errors.customer_phone_number && (
              <p className="text-red-500">
                {errors.customer_phone_number.message}
              </p>
            )}
           <label className='block mb-4'>
              <input
                {...register("active_customer_status")}
                type='checkbox'
                className='mr-2'
              />
              Active Customer
            </label>
            {errors.active_customer_status && <p className='text-red-500'>{errors.active_customer_status.message}</p>}
            <button
              disabled={isSubmitting}
              className="bg-customeRed px-5 py-3 text-white "
              type="submit"
            >
              {isUpdating ? <PulseLoader size={8} color="#fff" /> : "UPDATE"}
            </button>
            {error && <p className="text-red-500">Invalid Credential</p>}
          </form>
        </>
      ) : (
        <>
          <div className="py-4 px-2 border border-gray-00 text-center text-customBlue font-semibold">
            No records found
          </div>
        </>
      )}
    </div>
  );
}

export default page;
