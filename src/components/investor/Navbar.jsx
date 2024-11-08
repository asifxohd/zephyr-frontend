import React, { useState } from 'react';
import { Bell, Search, Menu, X, ChevronDown, Settings, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogoutConfirmation from '../Alerts/LogoutConfirmation';

const Navbar = ({ onSearch }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(true);
    setShowDropdown(false);
  };
  
  const handleLogoutConfirm = () => {
    console.log("Logging out...");
    setShowLogoutModal(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-16 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -top-16 right-48 w-32 h-32 bg-indigo-300 rounded-full opacity-10 blur-2xl"></div>
      </div>

      <nav className="relative bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo Section with Geometric Pattern */}
            <div className="relative flex items-center space-x-2">
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500/10 rounded-full blur"></div>
              <div className="text-3xl font-black">
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    ZEPHYR
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600/0 via-blue-500 to-indigo-500/0"></div>
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Advanced Search Box */}
              <div className={`relative transition-all duration-500 ease-in-out ${isSearchFocused ? 'w-80' : 'w-64'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className={`relative group bg-white/40 backdrop-blur-sm border-2 transition-all duration-300 rounded-2xl 
                              ${isSearchFocused ? 'border-blue-400 shadow-lg shadow-blue-500/20' : 'border-blue-200 hover:border-blue-300'}`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className={`h-5 w-5 transition-colors duration-300 ${isSearchFocused ? 'text-blue-500' : 'text-blue-400'}`} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search anything..."
                    value={searchValue}
                    className="w-full bg-transparent pl-12 pr-14 py-3 text-gray-700 placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-0"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      onSearch(e.target.value);
                    }}
                  />
                  {searchValue && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchValue('')}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}

                  {/* Search Suggestions Dropdown */}
                  {isSearchFocused && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-blue-100
                                  transform opacity-0 scale-95 transition-all duration-200 ease-out
                                  group-focus-within:opacity-100 group-focus-within:scale-100">
                      <div className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Search className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">Recent Searches</div>
                              <div className="text-xs text-gray-500">View your search history</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {/* Notification Bell */}
                <div className="relative group">
                  <div className="relative p-2 hover:bg-blue-50 rounded-xl transition-colors duration-200 cursor-pointer">
                    <Bell className="h-6 w-6 text-gray-600 group-hover:text-blue-500 transition-colors duration-200" />
                    <span className="absolute top-1 right-1 h-5 w-5 bg-gradient-to-r from-blue-500 to-indigo-500 
                                   rounded-full flex items-center justify-center ring-2 ring-white">
                      <span className="text-[10px] text-white font-bold">3</span>
                    </span>
                  </div>

                  {/* Notification Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-blue-100 
                                opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100
                                transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-semibold text-gray-900">Notifications</div>
                        <button className="text-xs text-blue-500 hover:text-blue-600">Mark all as read</button>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-start space-x-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Bell className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">New Notification {i}</div>
                              <div className="text-xs text-gray-500">This is a sample notification message</div>
                              <div className="text-xs text-gray-400 mt-1">2 mins ago</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Section */}
                <div className="relative group">
                  <button 
                    className="flex items-center space-x-3 group"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <div className="relative">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 p-[2px] 
                                    transition-transform duration-300 group-hover:scale-105">
                        <img
                          src="https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150517171.jpg"
                          alt="Profile"
                          className="rounded-[10px] w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full 
                                    ring-2 ring-white"></div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 
                                          transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  {/* Profile Dropdown */}
                  {showDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-blue-100 
                                  transform transition-all duration-200">
                      <div className="p-4 border-b border-gray-100">
                        <div className="text-sm font-semibold text-gray-900">John Doe</div>
                        <div className="text-xs text-gray-500">john.doe@example.com</div>
                      </div>
                      <div className="p-2">
                        {[
                          { icon: User, text: 'Profile', onClick: () => navigate('profile') },
                          { icon: Settings, text: 'Settings', onClick: () => {} },
                          { icon: LogOut, text: 'Logout', onClick: handleLogout, className: 'text-red-600 hover:bg-red-50' }
                        ].map((item, i) => (
                          <button
                            key={i}
                            onClick={item.onClick}
                            className={`w-full flex items-center space-x-3 p-2 rounded-lg text-gray-700 
                                    hover:bg-blue-50 transition-colors duration-200 ${item.className || ''}`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm">{item.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative p-2 rounded-xl hover:bg-blue-50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
              <div className="absolute inset-0 bg-blue-400/10 rounded-xl blur-lg transition-opacity duration-300 opacity-0 hover:opacity-100"></div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 px-4 space-y-4 bg-white/80 backdrop-blur-xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-blue-50/50 pl-12 pr-4 py-3 rounded-xl border-2 border-blue-200 
                           focus:border-blue-400 focus:ring-0 focus:outline-none"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                {['Notifications', 'Profile', 'Settings'].map((item, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between p-3 rounded-xl 
                              text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      <LogoutConfirmation
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default Navbar;