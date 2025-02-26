"use client";
import  { useState } from 'react'
import { useForm,SubmitHandler } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { CustomerFormField } from '@/types';
import { useAddCustomerMutation } from '@/features/api/apiSlice';


function page() {
  const [error,setError]=useState(false)

  const [addCustomer,{isError}]=useAddCustomerMutation()

  const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<CustomerFormField>()

   const onSubmit:SubmitHandler<CustomerFormField>=async(data)=>{

        try {

         await addCustomer(data)

         if(isError){
           setError(true)}
          
        } catch (error) {
          console.error("Error during sign-in:", error);
        }
      }
  

  return (
    <div className='max-w-[1200px] mx-auto px-10 mt-10  '>
      <p className="text-4xl font-bold text-customBlue ">
        Add a new customer
        <span className=" inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
      </p>
      <form className='mt-10' onSubmit={handleSubmit(onSubmit)}>
        <input {...register("customer_email",{required:" Customer Email is required",pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address"}})} className='block w-full sm:w-[50%] p-3 mb-5 border border-gray-200  rounded' placeholder='Email' />
        {errors.customer_email && <p className='text-red-500'>{errors.customer_email.message}</p>}
        <input {...register("customer_first_name",{required:"Customer first name  is required"})} className='block w-full sm:w-[50%] p-3 mb-5 border border-gray-200  rounded ' placeholder='Customer first name'  type='text'/>
        {errors.customer_first_name && <p className='text-red-500'>{errors.customer_first_name.message}</p>}
        <input {...register("customer_last_name",{required:"Customer last name  is required"})} className='block w-full sm:w-[50%] p-3 mb-5 border border-gray-200  rounded ' placeholder='Customer last name'  type='text'/>
        {errors.customer_last_name && <p className='text-red-500'>{errors.customer_last_name.message}</p>}
        <input {...register("customer_phone_number",{required:"Customer phone number  is required"})} className='block w-full sm:w-[50%] p-3 mb-5 border border-gray-200  rounded ' placeholder='Customer phone number'  type='text'/>
        {errors.customer_phone_number && <p className='text-red-500'>{errors.customer_phone_number.message}</p>}
        <button disabled={isSubmitting} className='bg-customeRed px-5 py-3 text-white mt-5' type='submit'>{isSubmitting?<PulseLoader size={8} color="#fff"  />:"ADD CUSTOMER"}</button>
        {error && <p className='text-red-500'>Something went wrong please try again.</p>}

      </form>
    </div>
  )
}

export default page