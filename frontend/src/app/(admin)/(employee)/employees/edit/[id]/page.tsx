"use client"
import { useEffect } from "react";
import { useGetEmployeeByIdQuery, useEmployeeUpdateInfoMutation } from "@/features/api/apiSlice";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { EmployeeUpdateForm } from "@/types";

function Page() {
  const { id } = useParams();
  const employee_id = parseInt(id as string);
  const [updateEmployeeInfo, { isLoading: isUpdating }] = useEmployeeUpdateInfoMutation();
  const { data: employee, isLoading, error } = useGetEmployeeByIdQuery({ employee_id });

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<EmployeeUpdateForm>({
    defaultValues: {
      employee_email: "",
      employee_first_name: "",
      employee_last_name: "",
      employee_phone: "",
      active_employee: false,
      company_role_id: 0
    }
  });

  useEffect(() => {
    if (employee?.data && employee.data.length > 0) {
      setValue("employee_email", employee.data[0].employee_email);
      setValue("employee_first_name", employee.data[0].employee_first_name);
      setValue("employee_last_name", employee.data[0].employee_last_name);
      setValue("employee_phone", employee.data[0].employee_phone);
      setValue("active_employee", employee.data[0].active_employee === 1);
      setValue("company_role_id", employee.data[0].company_role_id);
    }
  }, [employee, setValue]);

  const onSubmit: SubmitHandler<EmployeeUpdateForm> = async (data) => {
    try {
      await updateEmployeeInfo({ ...data, employee_id, active_employee: data.active_employee ? 1 : 0 });
      alert("Employee Updated Successfully");
    } catch (error) {
      alert("Failed to update Employee");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-10 mt-10">
      {employee?.data && employee.data.length > 0 ? (
        <>
          <p className="text-4xl font-bold text-customBlue">
            Edit {employee.data[0].employee_first_name} {employee.data[0].employee_last_name}
            <span className="inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
          </p>

          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block mb-2">Employee Email</label>
              <input
                {...register("employee_email", {
                  required: "Employee Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address"
                  }
                })}
                className="block w-full sm:w-[50%] p-2 mb-4 border border-gray-300 rounded"
                placeholder="Employee Email"
              />
              {errors.employee_email && <p className="text-red-500">{errors.employee_email.message}</p>}
            </div>

            <div>
              <label className="block mb-2">First Name</label>
              <input
                {...register("employee_first_name", { required: "Employee first name is required" })}
                className="block w-full sm:w-[50%] p-2 mb-4 border border-gray-300 rounded"
                placeholder="First Name"
                type="text"
              />
              {errors.employee_first_name && <p className="text-red-500">{errors.employee_first_name.message}</p>}
            </div>

            <div>
              <label className="block mb-2">Last Name</label>
              <input
                {...register("employee_last_name", { required: "Employee last name is required" })}
                className="block w-full sm:w-[50%] p-2 mb-4 border border-gray-300 rounded"
                placeholder="Last Name"
                type="text"
              />
              {errors.employee_last_name && <p className="text-red-500">{errors.employee_last_name.message}</p>}
            </div>

            <div>
              <label className="block mb-2">Phone</label>
              <input
                {...register("employee_phone", { required: "Employee phone number is required" })}
                className="block w-full sm:w-[50%] p-2 mb-4 border border-gray-300 rounded"
                placeholder="Phone"
                type="text"
              />
              {errors.employee_phone && <p className="text-red-500">{errors.employee_phone.message}</p>}
            </div>

            <div>
              <label className="block mb-4">
                <input
                  {...register("active_employee")}
                  type="checkbox"
                  className="mr-2"
                />
                Active Employee
              </label>
              {errors.active_employee && <p className="text-red-500">{errors.active_employee.message}</p>}
            </div>

            <div>
              <label className="block mb-4">
                <span className="text-gray-700">Employee Role</span>
                <select
                  {...register("company_role_id", { required: "Employee role is required" })}
                  className="block w-full sm:w-[50%] p-2 mb-4 border border-gray-300 rounded"
                >
                  <option value={1}>Employee</option>
                  <option value={2}>Admin</option>
                </select>
              </label>
              {errors.company_role_id && <p className="text-red-500">{errors.company_role_id.message}</p>}
            </div>

            <button
              disabled={isSubmitting}
              className="bg-customeRed px-5 py-3 text-white"
              type="submit"
            >
              {isUpdating ? <PulseLoader size={8} color="#fff" /> : "UPDATE"}
            </button>

            {error && <p className="text-red-500">Something went wrong, please try again later.</p>}
          </form>
        </>
      ) : (
        <div className="py-4 px-2 border border-gray-00 text-center text-customBlue font-semibold">
          No records found
        </div>
      )}
    </div>
  );
}

export default Page;
