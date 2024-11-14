import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, UserPlus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { checkFollowStatus, handleFollow, handleUnfollow } from '@/src/services/api/business/Connections';

const BusinessCard = ({ business, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const status = await checkFollowStatus(business.user_id);
                setIsFollowing(status);
            } catch (error) {
                console.error('Error checking follow status:', error);
            }
        };

        fetchFollowStatus();
    }, [business.user_id]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await handleUnfollow(business.user_id);
            } else {
                await handleFollow(business.user_id);
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error toggling follow status:', error);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded p-4 mb-4">
            <div className="flex gap-4">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img
                        src={business.avatar_image}
                        alt={business.company_name}
                        className="w-20 h-20 object-cover rounded"
                    />
                </div>

                {/* Info */}
                <div className="flex-grow">
                    <div className="flex justify-between items-start cursor-pointer">
                        <div>
                            <h3
                                onClick={() => navigate(`${business.user_id}`)}
                                className="font-medium hover:text-blue-500 text-lg text-gray-900">
                                {business.company_name}
                            </h3>

                            <div className="mt-1 space-y-1">
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{business.location}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Briefcase className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{business.industry}</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mt-2">
                                {isExpanded ? business.about_description :
                                    business.about_description?.slice(0, 100) + (business?.about_description?.length > 100 ? '...' : '')}
                                {business.about_description?.length > 100 && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="text-blue-600 ml-1 hover:underline"
                                    >
                                        {isExpanded ? 'show less' : 'read more'}
                                    </button>
                                )}
                            </p>

                            {business.tags && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {business.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Follow Button (conditional) */}
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
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
