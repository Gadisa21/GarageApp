"use client";
import React from 'react'
import {signIn} from 'next-auth/react'
import { useForm,SubmitHandler } from 'react-hook-form';

type FormFields= {
  email:string,
  password:string
}


  function  page() {
 
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<FormFields>()

    const onSubmit:SubmitHandler<FormFields>=async(data)=>{
      await new Promise(resolve=>setTimeout(resolve,1000))
      console.log(data)
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
        <button disabled={isSubmitting} className='bg-customeRed px-5 py-3 text-white ' type='submit'>{isSubmitting?"Loading...":"Sign In"}</button>
      </form>
    </div>
  )
}

export default page


// const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  //   console.log("submit")
  //   e.preventDefault()
  //   try {
  //     const response = await signIn("credentials", {
  //       redirect: false,
  //       email,
  //       password
  //     });

  //     if (response?.error) {
  //       // Handle sign-in errors
  //       console.error("Error during sign-in:", response.error);
       
  //     } else {
  //       // Redirect or handle successful login
  //       console.log("Sign-in successful");
  //       window.location.href = "/";
  //     }
  //   } catch (error) {
  //     console.error("Error during sign-in:", error);
  //   }
  // };