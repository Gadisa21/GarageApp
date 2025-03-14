"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { addEmployeeRequest } from '@/types';
import { useAddEmployeeMutation } from '@/features/api/apiSlice';

function Page() {
  const [error, setError] = useState(false);
  const [addEmployee, { isError }] = useAddEmployeeMutation();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<addEmployeeRequest>();

  const onSubmit: SubmitHandler<addEmployeeRequest> = async (data) => {
    try {
      await addEmployee(data).unwrap();
      setError(false);
      alert("Employee added successfully");
    } catch (error) {
      setError(true);
      console.error("Error during adding employee:", error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-10 my-10">
      <p className="text-4xl font-bold text-customBlue">
        Add a new employee
        <span className="inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
      </p>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("employee_email", {
            required: "Employee Email is required",
            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address" }
          })}
          className="block w-full sm:w-[50%] p-3 mb-5 border border-gray-200 rounded"
          placeholder="Email"
        />
        {errors.employee_email && <p className="text-red-500">{errors.employee_email.message}</p>}

        <input
          {...register("employee_first_name", { required: "Employee first name is required" })}
          className="block w-full sm:w-[50%] p-3 mb-5 border border-gray-200 rounded"
          placeholder="Employee first name"
          type="text"
        />
        {errors.employee_first_name && <p className="text-red-500">{errors.employee_first_name.message}</p>}

        <input
          {...register("employee_last_name", { required: "Employee last name is required" })}
          className="block w-full sm:w-[50%] p-3 mb-5 border border-gray-200 rounded"
          placeholder="Employee last name"
          type="text"
        />
        {errors.employee_last_name && <p className="text-red-500">{errors.employee_last_name.message}</p>}

        <input
          {...register("employee_phone", { required: "Employee phone number is required" })}
          className="block w-full sm:w-[50%] p-3 mb-5 border border-gray-200 rounded"
          placeholder="Employee phone number"
          type="text"
        />
        {errors.employee_phone && <p className="text-red-500">{errors.employee_phone.message}</p>}

        <select
          {...register("company_role_id", { required: "Employee role is required" })}
          className="block w-full sm:w-[50%] p-3 mb-5 border border-gray-200 rounded font-semibold"
        >
          <option value={1}>Employee</option>
          <option value={2}>Admin</option>
        </select>
        {errors.company_role_id && <p className="text-red-500">{errors.company_role_id.message}</p>}

        <input
          {...register("employee_password", {
            required: "Employee password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" }
          })}
          className="block w-full sm:w-[50%] p-3 mb-5 border border-gray-200 rounded"
          placeholder="Password"
          type="password"
        />
        {errors.employee_password && <p className="text-red-500">{errors.employee_password.message}</p>}

        <button
          disabled={isSubmitting}
          className="bg-customeRed px-5 py-3 text-white my-5"
          type="submit"
        >
          {isSubmitting ? <PulseLoader size={8} color="#fff" /> : "ADD EMPLOYEE"}
        </button>
        {error && <p className="text-red-500">Something went wrong, please try again.</p>}
      </form>
    </div>
  );
}

export default Page;
