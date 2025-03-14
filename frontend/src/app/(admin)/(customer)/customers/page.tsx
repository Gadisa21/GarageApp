"use client"
import { useState } from "react";
import { useGetcustomersByKeywordQuery, useGetCustomersQuery } from "@/features/api/apiSlice";
import { HiSearch } from "react-icons/hi";
import { useRouter } from "next/navigation";

function CustomersPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const { data: customers, isLoading, isError, error } = useGetCustomersQuery({ page, limit: 10 });
  const { data: searchCustomers, isLoading: isCustomerLoading, error: customerError } = useGetcustomersByKeywordQuery(
    { keyword },
    { skip: !keyword }
  );

  const handleNextPage = () => {
    if ((customers?.customers ?? []).length > 0) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.log("Error fetching customers:", error);
    return <div>Error</div>;
  }

  const displayedCustomers = keyword ? searchCustomers?.customers : customers?.customers;
  const isLoadingCustomers = keyword ? isCustomerLoading : isLoading;
  const isErrorCustomers = keyword ? customerError : isError;

  return (
    <div className="flex flex-col gap-10 mx-5 my-10 md:mx-16">
      <p className="text-4xl font-bold text-customBlue mb-3">
        Customers
        <span className="inline-block ml-3 w-10 h-[2px] bg-customeRed"></span>
      </p>

      <div className="relative">
        <input
          type="text"
          className="w-full border border-gray-300 p-4 rounded-md pr-10"
          placeholder="Search for a customer using first name, last name, or email address"
          value={keyword}
          onChange={handleSearchChange}
        />
        <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {isLoadingCustomers && <p>Loading...</p>}
      {isErrorCustomers && <p>Error</p>}

      {displayedCustomers && displayedCustomers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mt-3">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300">ID</th>
                <th className="py-2 px-4 border border-gray-300">First Name</th>
                <th className="py-2 px-4 border border-gray-300">Last Name</th>
                <th className="py-2 px-4 border border-gray-300">Email</th>
                <th className="py-2 px-4 border border-gray-300">Phone</th>
                <th className="py-2 px-4 border border-gray-300">Added Date</th>
                <th className="py-2 px-4 border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedCustomers.map((customer, index) => (
                <tr
                  key={customer.customer_id}
                  onClick={() => router.push(`/customers/${customer.customer_id}`)}
                  className={`cursor-pointer ${index % 2 ? "bg-gray-100" : ""} hover:bg-gray-200`}
                >
                  <td className="py-4 px-4 border border-gray-300">{customer.customer_id}</td>
                  <td className="py-4 px-4 border border-gray-300">{customer.customer_first_name}</td>
                  <td className="py-4 px-4 border border-gray-300">{customer.customer_last_name}</td>
                  <td className="py-4 px-4 border border-gray-300">{customer.customer_email}</td>
                  <td className="py-4 px-4 border border-gray-300">{customer.customer_phone_number}</td>
                  <td className="py-4 px-4 border border-gray-300">{new Date(customer.customer_added_date).toLocaleDateString()}</td>
                  <td className="py-4 px-4 border border-gray-300">{customer.active_customer_status ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-customBlue font-semibold">No customers found</p>
      )}

      <div className="flex justify-center mt-5">
        <button
          className="btn w-36 btn-outline border rounded-l border-gray-300 px-4 py-3 text-customBlue font-semibold"
          onClick={handlePreviousPage}
        >
          Previous Page
        </button>
        <button
          className="btn w-36 btn-outline border rounded-r border-gray-300 px-4 py-3 text-customBlue font-semibold"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomersPage;
