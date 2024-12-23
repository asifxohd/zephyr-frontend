import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Home,
  Building2,
  MessageSquare,
  Heart,
  Users,
  Video,
  Bell,
  Menu,
  X,
  User,
  Image
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../Common/UserContext';
import { BASE_URL_IMG } from '@/src/constents';

const ModernNavigationMenu = ({ children }) => {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  const {userInformations} = useContext(UserContext)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsMinimized(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'home', icon: Home, label: 'Home', route: '' },
    { name: 'business', icon: Building2, label: 'Business', route: 'businesses' },
    { name: 'investors', icon: User, label: 'Investors', route: 'investors' },
    { name: 'messages', icon: MessageSquare, label: 'Messages', route: 'messages' },
    { name: 'My Posts', icon: Image, label: 'My Posts', route: 'favourites' },
    { name: 'meetings', icon: Users, label: 'Meetings', route: 'meetings' },
    // { name: 'recordings', icon: Video, label: 'Recordings', route: 'meeting-recordings' },
    // { name: 'notifications', icon: Bell, label: 'Notifications', route: 'notifications' },
  ];

  const handleNavClick = (item) => {
    setActiveNav(item.name); 
    navigate(item.route);
  };

  const DesktopNav = () => (
    <div className="mt-5">
      <Card className={`transition-all rounded-none duration-300 ease-in-out ${
        isMinimized ? 'w-20' : 'w-64'
      } bg-white relative group shadow-xl `}>
        <div className="p-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            {!isMinimized && (
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Menu
              </span>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMinimized ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)} 
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  activeNav === item.name
                    ? 'bg-gradient-to-r from-blue-400 to-purple-300 text-white shadow-lg'
                    : 'hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} className={activeNav === item.name ? 'text-white' : 'text-gray-600'} />
                {!isMinimized && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </div>

          {/* Profile Section */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={userInformations.avatar_image ? BASE_URL_IMG+userInformations.avatar_image : "https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM="}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {!isMinimized && (
                <div>
                  <p className="font-medium">{userInformations.name ? userInformations.name  :"No Name" }</p>
                  {/* <p className="text-sm text-gray-500">Designer</p> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const MobileNav = () => (
    <div className="fixed bottom-0 z-10 left-0 right-0 bg-white border-t border-gray-200 shadow-lg rounded-t-3xl">
      <div className="max-w-md mx-auto px-6 py-2">
        <div className="flex justify-around items-center">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item)} // Update click handler
              className="flex flex-col items-center py-2 px-3 relative"
            >
              {activeNav === item.name && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full" />
              )}
              <item.icon
                size={24}
                className={`transition-colors duration-200 ${
                  activeNav === item.name ? 'text-blue-500' : 'text-gray-500'
                }`}
              />
              <span className={`text-xs mt-1 ${
                activeNav === item.name ? 'text-blue-500 font-medium' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen ">
      {/* Navigation */}
      {!isMobile && (
        <aside className="sticky top-0">
          <DesktopNav />
        </aside>
      )}
      
      {/* Mobile Navigation */}
      {isMobile && <MobileNav />}
      
      {/* Main content area */}

    </div>
  );
};

export default ModernNavigationMenu;
