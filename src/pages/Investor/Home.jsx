import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/investor/Navbar';
import PremiumCard from '../../components/investor/PremiumCard';
import NavigationMenu from '../../components/investor/NavigationMenu';
import PostModal from '../../components/investor/PostModal';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [activeNav, setActiveNav] = React.useState('Feed');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="lg:fixed flex flex-col min-h-screen w-full bg-gray-50">
      <Navbar />
      <div className="flex xl:px-20 w-full flex-grow mt-4">
        <NavigationMenu activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="w-full p-5">
          <Outlet />
        </div>
      </div>
      <PostModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Home;
