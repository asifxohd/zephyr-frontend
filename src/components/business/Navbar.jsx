import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutConfirmation from "../Alerts/LogoutConfirmation";

const Navbar = ({ onSearch, theme = "light" }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    navigate("profile");
    setShowDropdown(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    console.log("Logging out...");
    setShowLogoutModal(false);
    localStorage.clear();
    navigate("/");
  };

  const baseClasses = {
    nav: `px-6 py-4 lg:px-12 flex justify-between items-center transition-all duration-300 ${
      theme === "light"
        ? "bg-white shadow-[0_2px_20px_-12px_rgba(0,0,0,0.2)]"
        : "bg-gray-900 border-b border-gray-800"
    }`,
    input: `w-72 pl-12 pr-6 py-3 rounded-full border-2 transition-all duration-200 focus:outline-none shadow-sm ${
      theme === "light"
        ? "bg-gray-50 border-gray-100 placeholder-gray-400 focus:border-gray-200 focus:bg-white text-gray-800 hover:border-gray-200"
        : "bg-gray-800 border-gray-700 placeholder-gray-500 focus:border-gray-600 focus:bg-gray-900 text-white hover:border-gray-600"
    }`,
    dropdownMenu: `absolute z-10 right-0 mt-4 w-64 py-3 rounded-2xl shadow-2xl border backdrop-blur-sm ${
      theme === "light"
        ? "bg-white/95 border-gray-100"
        : "bg-gray-900/95 border-gray-800"
    }`,
    dropdownItem: `w-full px-4 py-2 text-left flex items-center space-x-3 transition-all duration-200 ${
      theme === "light"
        ? "text-gray-700 hover:bg-gray-50"
        : "text-gray-100 hover:bg-gray-800"
    }`,
  };

  return (
    <nav className={baseClasses.nav}>
      <div className="flex items-center px-3 space-x-12">
        {/* Enhanced Logo */}
        <div className="relative group">
          <div
            className={`text-2xl font-black tracking-tighter relative z-10 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            ZEPHYR
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-black/10 rounded-full transform group-hover:scale-x-110 transition-transform duration-300"></div>
            <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-blue-500/10 group-hover:scale-150 transition-transform duration-300"></div>
            <div className="absolute -left-4 top-2 w-4 h-4 rounded-full bg-purple-500/10 group-hover:scale-150 transition-transform duration-300"></div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative hidden md:block group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${
                theme === "light"
                  ? "text-gray-400 group-hover:text-gray-600"
                  : "text-gray-500 group-hover:text-gray-400"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            className={baseClasses.input}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Notification Bell */}
        <div className="relative">
          <div
            className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
              theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-800"
            }`}
          >
            <svg
              className={`w-7 h-7 cursor-pointer transition-colors duration-200 ${
                theme === "light"
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-gray-400 hover:text-white"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex items-center space-x-3 p-2 rounded-xl transition-all duration-200 group ${
              theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-800"
            }`}
          >
            <div className="relative">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-offset-2 ring-gray-200 group-hover:ring-gray-300 transition-all duration-200"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                showDropdown ? "transform rotate-180" : ""
              } ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Enhanced Dropdown */}
          {showDropdown && (
            <div className={baseClasses.dropdownMenu}>
              <div className="px-5 pb-3 mb-2 border-b border-gray-100">
                <p
                  className={`text-xs ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Signed in as
                </p>
                <p className="font-semibold mt-0.5 text-sm">
                  john.doe@example.com
                </p>
              </div>
              <button
                onClick={handleProfileClick}
                className={baseClasses.dropdownItem}
              >
                <svg
                  className={`w-5 h-5 ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium text-sm">View Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className={baseClasses.dropdownItem}
              >
                <svg
                  className={`w-5 h-5 ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium text-sm">Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <LogoutConfirmation
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </nav>
  );
};

export default Navbar;
