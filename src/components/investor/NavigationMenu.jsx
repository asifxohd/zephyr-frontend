import React, { useState } from 'react';
import { FaBars, FaBuilding, FaComments, FaHeart, FaUsers, FaVideo, FaBell, FaRss } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavigationMenu = ({ activeNav, setActiveNav }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const navigate = useNavigate();
    
    const handleNavigation = (path, name) => {
        if (path === 'profile') {
            setActiveNav(null);  // Clear active navigation state
        } else {
            setActiveNav(name);
        }
        navigate(path);
    };

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    const navItems = [
        { name: 'Feed', icon: FaRss, path: '' },
        { name: 'Businesses', icon: FaBuilding, path: 'businesses' },
        { name: 'Messages', icon: FaComments, path: 'messages' },
        { name: 'Favourites', icon: FaHeart, path: 'favourites' },
        { name: 'Meetings', icon: FaUsers, path: 'meetings' },
        { name: 'Recordings', icon: FaVideo, path: 'meeting-recordings' },
        { name: 'Notifications', icon: FaBell, path: 'notifications' },
    ];

    return (
        <motion.nav
            animate={{ width: isMinimized ? '80px' : '300px' }}
            className="bg-white mt-5 rounded-xl p-4 shadow-lg flex flex-col justify-between h-full"
        >
            <div className="flex justify-between items-center">
                <button onClick={toggleSidebar} className="text-gray-700 hover:text-blue-400 ml-2.5 focus:outline-none">
                    <FaBars className="text-xl" />
                </button>
            </div>
            <ul className="mt-5 space-y-4">
                {navItems.map((item) => (
                    <motion.li
                        key={item.name}
                        className={`flex items-center p-3 rounded-full cursor-pointer text-base transition-all ${activeNav === item.name
                            ? 'bg-blue-400 text-white'
                            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-400'
                            } ${isMinimized ? 'justify-center' : 'w-full text-left'}`}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleNavigation(item.path, item.name)}
                    >
                        <item.icon className='text-xl' />
                        {!isMinimized && <span className="ml-2">{item.name}</span>}
                    </motion.li>
                ))}
            </ul>

            {/* Profile Card */}
            <motion.div
                className={`py-4 rounded-lg cursor-pointer flex items-center ${isMinimized ? 'justify-center' : 'space-x-4'}`}
                onClick={() => handleNavigation('profile', null)}  // Update to clear activeNav
                whileHover={{ scale: 1.05 }}
            >
                <div className="flex items-center justify-center h-12 mt-7">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5nK9W8-R9Sbwk4m51Bnj96DKlyw3LEBp47oToBHJ3maJEPiOX31kXi66cqLfOiVlnkrU&usqp=CAU"
                        alt="Profile"
                        className="rounded-full object-cover w-full h-full"
                    />
                </div>
                {!isMinimized && (
                    <div>
                        <p className=" mt-7 font-semibold text-gray-800">Jon Doe</p>
                    </div>
                )}
            </motion.div>
        </motion.nav>
    );
};

export default NavigationMenu;
