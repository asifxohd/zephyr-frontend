import React from 'react';
import { FaUser, FaEnvelope, FaCalendarCheck, FaHandshake, FaBell, FaCogs, FaRss } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HorizontalMenuBar = ({ activeNav, setActiveNav }) => {
    const navigate = useNavigate();

    const handleNavigation = (path, name) => {
        setActiveNav(name);
        navigate(path);
    };

    const navItems = [
        { name: 'Feed', icon: FaRss, path: '' },
        { name: 'Investors', icon: FaUser, path: 'investors' },
        { name: 'Messages', icon: FaEnvelope, path: 'messages' },
        { name: 'Meetings', icon: FaCalendarCheck, path: 'meetings' },
        { name: 'Join Meetings', icon: FaHandshake, path: 'join-meetings' },
        { name: 'Notifications', icon: FaBell, path: 'notifications' },
        { name: 'Subscriptions', icon: FaCogs, path: 'subscriptions' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0  flex z-20 justify-center py-2">
            <div className="relative px-5 bg-gray-900 rounded-full shadow-lg">
                <div className="flex items-center justify-center space-x-6 py-2">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.name}
                            className={`flex flex-col items-center justify-center rounded-full cursor-pointer transition-all ${
                                activeNav === item.name ? 'bg-white px-2 py-2 text-black' : 'text-white hover:bg-gray-700'
                            }`}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => handleNavigation(item.path, item.name)}
                        >
                            <item.icon className="text-xl md:text-sm" />
                            <span className="text-xs hidden md:block">{item.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HorizontalMenuBar;
