import React from 'react';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch }) => {

    const navigate = useNavigate()

    const handleProfileClick = () => {
        navigate('profile')
    }
    return (
        <nav className="p-3 lg:px-16 flex justify-between items-center bg-white shadow-lg rounded-lg border-b border-gray-200">
            <div className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800 uppercase">
                ZEPHYR
            </div>
            <div className="flex items-center space-x-6">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded-full p-2 w-48 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                    onChange={(e) => onSearch(e.target.value)}
                />
                <div className="relative">
                    <FaBell className="text-black text-xl cursor-pointer hover:text-gray-700 transition-colors" />
                    <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
                <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-black cursor-pointer transition-all"
                    onClick={handleProfileClick}
                />
            </div>
        </nav>
    );
};

export default Navbar;
