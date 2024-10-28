import React from 'react';
import { FaBell } from 'react-icons/fa';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="p-3 lg:mx-16 flex justify-between items-center border-b border-gray-200">
      <div className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 uppercase">
        ZEPHYR
      </div>
      <div className="flex items-center space-x-6">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg p-2 w-48"
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="relative">
          <FaBell className="text-gray-600 text-xl cursor-pointer" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
