"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetcustomerByIdQuery } from '@/features/api/apiSlice'
import { useForm,SubmitHandler } from 'react-hook-form';

type FormFields= {
  email:string,
  password:string 
}

function page() {

  const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<FormFields>()

  const { id } = useParams()
  const customer_id=parseInt(id as string)
  const { data, error, isLoading } = useGetcustomerByIdQuery({customer_id})
  if (isLoading) return <div>Loading...</div>

  
 const onSubmit:SubmitHandler<FormFields>=async(data)=>{

 }

  return (
    <div className='max-w-[1200px] mx-auto px-10 mt-10'>

      {(data?.data &&  data.data.customer)?(
        <> 
         <p className="text-4xl font-bold text-customBlue ">
        Edit Gadisa Abdisa
        <span className=" inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
      </p>

<form className='mt-10' onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email",{required:"Email is required",pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address"}})} className='block w-full sm:w-[50%] p-2 mb-4 border border-gray-300  rounded' placeholder='Email' />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        <input {...register("password",{required:"Password is required",minLength:{value:8,message:"Password must be at least 8 character"}})} className='block w-full sm:w-[50%] p-2 mb-4 border border-gray-300  rounded ' placeholder='Password'  type='password'/>
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        <button disabled={isSubmitting} className='bg-customeRed px-5 py-3 text-white ' type='submit'>{isSubmitting?<PulseLoader size={8} color="#fff"  />:"Sign In"}</button>
        {error && <p className='text-red-500'>Invalid Credential</p>}

      </form>
         </>
      ):(<>
      <div  className="py-4 px-2 border border-gray-00 text-center text-customBlue font-semibold">
                  No records found
                </div>
        
        </>)}
    </div>
  )
}

export default page