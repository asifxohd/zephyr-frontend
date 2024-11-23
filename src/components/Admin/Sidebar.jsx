import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./Sideutils.jsx"
import {
    IconDashboard,
    IconReportAnalytics,
    IconBusinessplan,
    IconUsers,
    IconSubscript,
    IconLogout2,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "./utils.js";
import LogoutConfirmation from "../Alerts/LogoutConfirmation.jsx";

export function SidebarDemo({ children }) {
    const [data, setData] = useState({
        profileImage: 'https://assets.aceternity.com/default-avatar.png',
        username: 'Default Username',
        email: 'default@example.com',
    });
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    const handleLogoutClick = () => {
        setIsModalOpen(true); 
    };

    const handleCloseConfirmation = () => {
        setIsModalOpen(false);
    };

    const handleConfirmLogout = () => {
        console.log("User logged out");
        localStorage.clear();
        navigate('/')
        handleCloseConfirmation(); 
    };

    const links = [
        {
            label: "Dashboard",
            href: "dashboard",
            icon: (
                <IconDashboard className="text-neutral-700 h-7 w-7 flex-shrink-0" />
            ),
        },
        {
            label: "Sales Report",
            href: "sales-report",
            icon: (
                <IconReportAnalytics className="text-neutral-700 h-7 w-7 flex-shrink-0" />
            ),
        },
        {
            label: "Investors",
            href: "investors",
            icon: (
                <IconUsers className="text-neutral-700 h-7 w-7 flex-shrink-0" />
            ),
        },
        {
            label: "Businesses",
            href: "businesses",
            icon: (
                <IconBusinessplan className="text-neutral-700 h-7 w-7 flex-shrink-0" />
            ),
        },
        {
            label: "posts",
            href: "posts",
            icon: (
                <IconSubscript className="text-neutral-700 h-7 w-7 flex-shrink-0" />
            ),
        },
    ];

    return (
        <div
            className={cn(
                "rounded-md flex flex-col  md:flex-row bg-gray-100 w-full flex-1 mx-auto border border-neutral-200 overflow-hidden",
                "h-screen"
            )}>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                            <div onClick={handleLogoutClick} className={cn("flex items-center justify-start gap-2  group/sidebar py-2")}>
                                <IconLogout2 className="text-neutral-700 h-7 w-7 flex-shrink-0" />
                                <motion.span
                                    animate={{
                                        display: (open ? "inline-block" : "none"),
                                        opacity: (open ? 1 : 0)
                                    }}
                                    className="text-neutral-700  text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
                                    Logout
                                </motion.span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: data.username,
                                href: "#",
                                icon: (
                                    <img
                                        src={data.profileImage}
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }} />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1 overflow-y-scroll scrollbar-hide">
                <div
                    className="p-2 md:p-10 overflow-y-auto scrollbar-hide max-h-screen rounded-tl-2xl border border-neutral-200 bg-white flex flex-col gap-2 flex-1 w-full h-full">
                    {children}
                </div>
            </div>
            <LogoutConfirmation 
                isOpen={isModalOpen} 
                onClose={handleCloseConfirmation} 
                onConfirm={handleConfirmLogout}
            />
        </div>
    );
}

export const Logo = () => {
    return (
        <Link
            className="font-normal gap-2 flex ">
            <img className="h-7 w-7" src="https://img.freepik.com/premium-vector/z-logo-a1-brand-symbol-design-graphic-minimalistlogo_67323-888.jpg" alt="" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl text-black whitespace-pre">
                ZEPHYR
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            to="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
            <img className="h-7 w-7" src="https://img.freepik.com/premium-vector/z-logo-a1-brand-symbol-design-graphic-minimalistlogo_67323-888.jpg" alt="" />
        </Link>
    );
};