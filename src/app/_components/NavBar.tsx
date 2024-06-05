"use client"; // Add this line to mark the component as a client component
import React, { useState } from "react";
import Link from "next/link";
import { Transition } from "@headlessui/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-bold">Brand</span>
            </Link>
          </div>
          <div className="hidden space-x-4 md:flex">
            <Link href="/">
              <span className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700">
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700">
                About
              </span>
            </Link>
            <Link href="/services">
              <span className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700">
                Services
              </span>
            </Link>
            <Link href="/contact">
              <span className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700">
                Contact
              </span>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:text-white focus:outline-none"
            >
              <svg
                className={`h-6 w-6 transform transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition-transform ease-out duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform ease-in duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="absolute left-0 top-0 h-full w-64 bg-gray-800 shadow-lg md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link href="/">
              <span className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700">
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700">
                About
              </span>
            </Link>
            <Link href="/services">
              <span className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700">
                Services
              </span>
            </Link>
            <Link href="/contact">
              <span className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700">
                Contact
              </span>
            </Link>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;
