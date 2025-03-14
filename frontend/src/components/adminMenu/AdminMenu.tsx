"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { 
  FaTachometerAlt, FaUsers, FaBoxOpen, FaUserPlus, 
  FaUserTie, FaWrench, FaBars 
} from "react-icons/fa"; // Icons

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
  { name: "Orders", href: "/orders", icon: FaBoxOpen },
  { name: "New Order", href: "/neworder", icon: FaBoxOpen },
  { name: "Add Employee", href: "/addEmployee", icon: FaUserPlus },
  { name: "Employees", href: "/employees", icon: FaUsers },
  { name: "Add Customer", href: "/addCustomer", icon: FaUserTie },
  { name: "Customers", href: "/customers", icon: FaUsers },
  { name: "Services", href: "/Services", icon: FaWrench },
];

const AdminMenu = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Sidebar state

  if (!session) {
    return null;
  }

  return (
    <div className={`bg-blue-950 text-white h-screen flex flex-col transition-all duration-300 ${isMenuOpen ? "w-64" : "w-20"}`}>
      
      {/* Header + Toggle Button */}
      <div className="flex items-center justify-between p-4">
        {isMenuOpen && <h1 className="text-2xl font-bold">Admin</h1>}
        <FaBars 
          className="text-white text-2xl cursor-pointer hover:scale-110 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
      </div>

      {/* Menu Items */}
      <ul className="flex-1 mt-5 space-y-2">
        {menuItems.map(({ name, href, icon: Icon }) => (
          <li key={name} className="flex items-center space-x-3 p-3 hover:bg-blue-800 rounded-md">
            <Icon className="text-xl" />
            {isMenuOpen && <Link href={href} className="text-sm">{name}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenu;
