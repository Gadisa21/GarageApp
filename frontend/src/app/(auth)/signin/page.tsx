import React from 'react'

function page() {
  return (
    <div className='max-w-[1200px] mx-auto px-10'>
      <p className="text-4xl font-bold text-customBlue ">
        Login to your account{" "}
        <span className=" inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
      </p>
      <form className='mt-10'>
        <input className='block w-full sm:w-[50%] p-2 mb-4 border border-gray-300  rounded' placeholder='Email'></input>
        <input className='block w-full sm:w-[50%] p-2 mb-4 border border-gray-300  rounded ' placeholder='Password'></input>
        <button className='bg-customeRed px-5 py-3 text-white '>Sign In</button>
      </form>
    </div>
  )
}

export default page