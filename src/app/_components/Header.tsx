import React from "react";

function Header() {
  return (
    <header className="w-full bg-gray-400">
      <div className="mx-auto overflow-hidden">
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex flex-wrap items-center">
            <div className="mr-14">
              {/* Assuming you have a logo or something similar */}
              <a href="/">
                {/* <img src="/path-to-your-logo.jpg" alt="Logo" className="h-24 hover:scale-105 transition ease-in-out duration-1000 rounded-5xl" /> */}
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <ul className="text-customOrange flex items-center">
              <li className="mr-9 font-medium hover:text-gray-700">
                <a href="/">Home</a>
              </li>
              <li className="mr-9 font-medium hover:text-gray-700">
                <a href="/louis">Louis</a>
              </li>

              <li className="font-medium hover:text-gray-700">
                <a href="/user">Profile</a>
              </li>
            </ul>
          </div>
          {/* Add your mobile navigation trigger here if needed */}
        </div>
      </div>
    </header>
  );
}

export default Header;
