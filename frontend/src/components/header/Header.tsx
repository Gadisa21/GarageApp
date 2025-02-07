"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Header() {

  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
     
      <div className="md:flex justify-between items-center ">
        <div className="text-center bg-customeRed text-white p-7">
          <p>Enjoy the Beso while we fix your car</p>
        </div>
        <div className="  hidden md:pl-32 lg:pl-7 md:flex  flex-grow justify-between bg-customBlue text-white p-7">
          <p >Monday - Saturday 7:00AM-6:00PM</p>
          <p className="hidden lg:block">Call Abe: +2529044710</p>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex h-16 justify-between sm:h-24 items-center px-6 sm:px-14 relative">
        {/* Logo */}
        <Image
          src="/images/logo.png"
          width={271}
          height={50}
          alt="logo"
          className="hidden lg:block"
        />

        {/* Menu Icon */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-customBlue text-2xl absolute right-6 top-7"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:flex flex-col sm:flex-row absolute sm:static top-16 right-0 sm:top-0 bg-white sm:bg-transparent w-full sm:w-auto shadow-md sm:shadow-none px-6 sm:px-0 py-4 sm:py-0 gap-6 sm:gap-7 z-10 mx-auto lg:mx-0`}
        >
          <ul className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7 text-customBlue">
            <li>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
             {session ? (
              <li className="pl-0 sm:pl-7 sm:border-l-2">
                <button
                  className="bg-customBlue text-white py-3 px-4 block text-center sm:inline-block"
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut({ callbackUrl: '/signin' });
                  }}
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li className="pl-0 sm:pl-7 sm:border-l-2">
                <Link
                  href="/signin"
                  className="bg-customBlue text-white py-3 px-4 block text-center sm:inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div> 
    </div>
  );
}

export default Header;
