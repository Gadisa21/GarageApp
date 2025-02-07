"use client";
import  { useState } from 'react'
import {signIn} from 'next-auth/react'
import { useForm,SubmitHandler } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { useRouter, useSearchParams } from 'next/navigation'

type FormFields= {
  email:string,
  password:string 
}


  function  SignInPage() {


const [error,setError]=useState(false)
  const router = useRouter();
const searchParams = useSearchParams();
 
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<FormFields>()

    const onSubmit:SubmitHandler<FormFields>=async(data)=>{
      const {email,password}=data 
      try {
       const callbackUrl = searchParams.get("callbackUrl") || "/";

        const response = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl,
        });
  
        if (response?.error) {
          // Handle sign-in errors
          setError(true)
          console.error("Error during sign-in:", response.error);
          
         
        } else {
          // Redirect or handle successful login
          console.log("Success:", response);
          router.push(response?.url || "/");
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
    }
 
  return (
    <div className='max-w-[1200px] mx-auto px-10'>
      <p className="text-4xl font-bold text-customBlue ">
        Login to your account{" "}
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
    </div>
  )
}

export default SignInPage


