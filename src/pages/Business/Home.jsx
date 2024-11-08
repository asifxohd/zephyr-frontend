import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationMenu from '../../components/business/NavigationMenu';
import Navbar from '../../components/business/Navbar';
import useSubscriptionStatus from '@/src/hooks/useSubscriptionStatus';
import Subscription from './Subscription';

const Home = () => {
    const [activeNav, setActiveNav] = useState('Feed');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const scrollRef = useRef(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const currentScrollY = scrollRef.current.scrollTop;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        }
    };

    useEffect(() => {
        const scrollableDiv = scrollRef.current;

        const debounceHandleScroll = () => {
            clearTimeout(scrollableDiv._debounceTimeout);
            scrollableDiv._debounceTimeout = setTimeout(handleScroll, 50);
        };

        if (scrollableDiv) {
            scrollableDiv.addEventListener('scroll', debounceHandleScroll);
        }

        return () => {
            if (scrollableDiv) {
                scrollableDiv.removeEventListener('scroll', debounceHandleScroll);
                clearTimeout(scrollableDiv._debounceTimeout);
            }
        };
    }, [lastScrollY]);

    const { isSubscribed } = useSubscriptionStatus();

    if (!isSubscribed) {
        return <Subscription />; 
    }

    return (
        <div className="lg:fixed flex flex-col min-h-screen w-full bg-gray-100">
            <Navbar />
            <div className="flex xl:px-20 w-full flex-grow mt-4">
                <motion.div
                    initial={{ y: 0, opacity: 7 }}
                    animate={{ y: isVisible ? 0 : '-0%', opacity: isVisible ? 2 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed top-0 left-0 right-0 z-50"
                    style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
                >
                </motion.div>
                <div className='mt-5'>
                    <NavigationMenu activeNav={activeNav} setActiveNav={setActiveNav} />
                </div>
                <div ref={scrollRef} className="w-full p-5 overflow-y-scroll h-screen scrollbar-hide pb-32">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Home;
