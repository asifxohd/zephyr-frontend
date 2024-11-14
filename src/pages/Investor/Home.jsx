import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/investor/Navbar';
import PremiumCard from '../../components/investor/UsersToFollow';
import NavigationMenu from '../../components/investor/NavigationMenu';
import PostModal from '../../components/investor/PostModal';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [activeNav, setActiveNav] = React.useState('Feed');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="lg:fixed flex flex-col min-h-screen w-full bg-gray-100">
      <Navbar />
      <div className="flex xl:px-12 w-full lg:-z-10 flex-grow mt-4 ">
        <NavigationMenu activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="w-full pl-5 pt-5 h-screen scrollbar-hide overflow-y-scroll">
          <Outlet />
        </div>
      </div>
      <PostModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Home;
