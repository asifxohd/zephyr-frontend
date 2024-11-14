import React, { useEffect, useState } from 'react';
import { MapPin, Briefcase, UserPlus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchInvestrUserInfomationForClient } from '@/src/services/api/business/userManagerapis';
import Pagination from '@/src/components/business/Pagination';
import { useNavigate } from 'react-router-dom';
import { handleUnfollow, handleFollow, checkFollowStatus } from '@/src/services/api/business/Connections';

const InvestorList = () => {
    const [investorsInfo, setInvestorsInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchUser = async (page = 1) => {
            try {
                const response = await fetchInvestrUserInfomationForClient(page);
                console.log(response);

                const { results, count } = response || {};
                setInvestorsInfo(results || []);
                setTotalPages(Math.ceil(count / 7));
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto">
                <div>
                    {investorsInfo.map((investor, index) => (
                        <motion.div
                            className='mb-2'
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <InvestorCard investor={investor} />
                        </motion.div>
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <div className="pb-20"></div>
        </div>
    );
};

export default InvestorList;



const InvestorCard = ({ investor }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const status = await checkFollowStatus(investor.id);
                setIsFollowing(status);
            } catch (error) {
                console.error('Error checking follow status:', error);
            }
        };

        fetchFollowStatus();
    }, [investor.id]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await handleUnfollow(investor.id);
            } else {
                await handleFollow(investor.id);
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error toggling follow status:', error);
        }
    };



    return (
        <div className="group cursor-pointer">
            <div className="relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white border border-gray-100">
                <div className="relative p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden ring-2 ring-white shadow-lg">
                                    <img
                                        src={investor.avatar_image || 'https://img.freepik.com/premium-vector/black-silhouette-default-profile-avatar_664995-354.jpg?semt=ais_hybrid'}
                                        alt={investor.full_name || "Not found"}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 onClick={() => navigate(`${investor.id}`)} className="text-base sm:text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                                    {investor.full_name || "Not found"}
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mt-1">
                                    <div className="flex items-center text-gray-500 text-sm mt-1 sm:mt-0">
                                        <Briefcase size={14} className="mr-1 flex-shrink-0" />
                                        <span className="truncate">{investor.email || "Not found"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleFollowToggle}
                            className={`px-4 py-1.5 rounded-full text-xs flex items-center  ${isFollowing ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {isFollowing ? (
                                <Check className="w-4 h-4 mr-1" />
                            ) : (
                                <UserPlus className="w-4 h-4 mr-1" />
                            )}
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                        {investor.description || "Not found"}
                    </p>
                </div>
            </div>
        </div>
    );
};

