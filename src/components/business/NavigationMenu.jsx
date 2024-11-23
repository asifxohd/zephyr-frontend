import React, { useState } from "react";
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  BarChart2,
  Settings,
  User,
  Sparkles,
  CreditCard,

} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState("home");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovering, setIsHovering] = useState("");
const navigate = useNavigate()
  const menuItems = [
    {
      id: "feed",
      name: "Feed",
      icon: Home,
      link: "",
      notifications: 0,
      description: "overview",
    },
    {
      id: "business",
      name: "Business",
      link:'listed-businesses',
      icon: Sparkles,
      // notifications: 3,
      description: "Popular content",
    },
    {
      id: "investors",
      name: "Investors",
      link:'investors',
      icon: Users,
      // notifications: 12,
      description: "Key investors",
    },
    {
      id: "messages",
      name: "Messages",
      icon: MessageSquare,
      link:"messages",
      notifications: 5,
      description: "Chat & communications",
    },
    {
      id: "Subscriptions",
      name: "Subscriptions",
      icon: CreditCard,
      link:'view-subscriptions',
      notifications: 0,
      description: "Statistics & reports",
    },
    {
      id: "schedule",
      name: "Schedule",
      icon: Calendar,
      link:'schedule-meetings',
      notifications: 2,
      description: "Meetings & events",
    },
  ];

  const handleSelect = (itemId) => {
    setSelected(itemId);
  };

  return (
    <>
      <div
        className={`hidden md:flex px-4 flex-col left-0 top-0 
                            bg-white border-r border-gray-100
                                transition-all duration-300 ease-out shadow-lg
                    ${isExpanded ? "w-64" : "w-20"}`}
      >
        <div className="relative px-4 py-6 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-50 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl ring-1 ring-gray-100"></div>
            </div>
            {isExpanded && (
              <span className="text-lg font-semibold text-gray-900"></span>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = selected === item.id;
            const isHovered = isHovering === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setIsHovering(item.id)}
                onMouseLeave={() => setIsHovering("")}
                onClick={() =>{ handleSelect(item.id),navigate(item.link)}}
                className={`relative group flex items-center gap-3 p-3 select-none
                  rounded-xl cursor-pointer transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {/* Active item indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full" />
                )}

                {/* Icon with subtle animation */}
                <div
                  className={`relative ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-transform duration-200 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />
                  {item.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center bg-blue-500 text-white rounded-full">
                      {item.notifications}
                    </span>
                  )}
                </div>

                {/* Text and description */}
                {isExpanded && (
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        isActive ? "text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                      {item.description}
                    </p>
                  </div>
                )}

                {/* Hover effect */}
                {isHovered && !isActive && (
                  <div className="absolute inset-0 bg-gray-50 rounded-xl -z-10" />
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div
            className={`flex items-center gap-3 ${
              isExpanded ? "justify-between" : "justify-center"
            }`}
          >
            <div onClick={()=> navigate('profile')} className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-blue-100/50 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white">
                  <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    Alex Johnson
                  </p>
                  <p className="text-xs text-gray-400">Premium User</p>
                </div>
              )}
            </div>
            {isExpanded && (
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-50">
        <nav className="flex justify-around items-center h-16 px-4">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = selected === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="relative group flex flex-col items-center justify-center"
              >
                <div
                  className={`relative ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  {item.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center bg-blue-500 text-white rounded-full">
                      {item.notifications}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-4 w-1 h-1 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
