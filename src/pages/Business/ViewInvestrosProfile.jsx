import React, { useEffect, useState } from 'react';
import { Mail, Phone, Share2, MapPin, Briefcase, Calendar, MessageSquare, UserPlus, UserMinus, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { individualInvestorUserInfo } from '@/src/services/api/admin/InvesterInfoapis';
import { Button } from "@/components/ui/button";
import { checkFollowStatus, fetchFollowingAndUnfollowingForUser, handleFollow, handleUnfollow } from '@/src/services/api/business/Connections';
import FollowStats from '@/src/components/Common/FollowStats';


const ViewInvestorProfile = () => {
    const { id } = useParams();
    const [investorInfo, setInvestorsInfo] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(()=> {
		const fetchData = async () => {
			try {
				const response = await fetchFollowingAndUnfollowingForUser(id);
				setFollowers(response.followers)
				setFollowing(response.following)
				console.log(response);
				
			} catch (error) {
				console.log(error);
				
			}
		}
		fetchData();
	}, [id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await individualInvestorUserInfo(id);
                setInvestorsInfo(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const status = await checkFollowStatus(id);
                setIsFollowing(status);
            } catch (error) {
                console.error('Error checking follow status:', error);
            }
        };

        fetchFollowStatus();
    }, [id]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await handleUnfollow(id);
            } else {
                await handleFollow(id);
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error toggling follow status:', error);
        }
    };


    const handleStartChat = () => {
        console.log('Starting chat with investor:', id);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return `Since ${formattedDate}`;
    };

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
            {/* Cover Image */}
            <div className="relative h-36 sm:h-44 md:h-52 w-full bg-gray-200">
                <img
                    src={investorInfo?.investor_preferences?.cover_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShhaKckoGwx48DVxoVZUCFNhvh3gJmh1MDlA&s"}
                    alt="Profile Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Profile Content */}
            <div className="relative px-4 sm:px-6 md:px-10 pb-6 sm:pb-8 md:pb-10 pt-1">
                {/* Avatar */}
                <div className="absolute -top-16 sm:-top-20 md:-top-28 left-4 sm:left-6 md:left-10">
                    <img
                        src={investorInfo?.investor_preferences?.avatar_image || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                        alt={investorInfo.full_name}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 border-white shadow-lg rounded-full object-cover"
                    />
                </div>

                <div className="mt-12 sm:mt-16 md:mt-20">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                        <div className="space-y-2">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{investorInfo.full_name}</h1>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                <span className={`text-sm sm:text-base text-black px-3 py-1 rounded-full ${investorInfo.status ? 'bg-green-100' : 'bg-red-100'}`}>
                                    {investorInfo.status ? 'Active' : 'Inactive'}
                                </span>

                                <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(investorInfo.date_joined)}</span>
                                </div>
                            </div>

                            {/* Followers Section */}
                            <div className="flex items-center gap-6 mt-2">
                                <FollowStats followers={followers} following={following}/>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 sm:gap-3 items-center w-full sm:w-auto">
                            {isFollowing && (
                                <Button
                                    onClick={handleStartChat}
                                    variant="default"
                                    className="flex-1 sm:flex-none text-white items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105"
                                    size="sm"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="hidden sm:inline">Message</span>
                                </Button>
                            )}
                            <Button
                                onClick={handleFollowToggle}
                                variant={isFollowing ? "outline" : "default"}
                                className="flex-1 sm:flex-none items-center gap-2 transition-all duration-300 hover:scale-105"
                                size="sm"
                            >
                                {isFollowing ? (
                                    <>
                                        <UserMinus className="w-4 h-4" />
                                        <span className="hidden sm:inline">Unfollow</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-4 h-4" />
                                        <span className="hidden sm:inline">Follow</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                        <a
                            href={`mailto:${investorInfo.email}`}
                            className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
                            <span>{investorInfo.email}</span>
                        </a>
                        <a
                            href={`tel:${investorInfo.phone_number}`}
                            className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                            <span>{investorInfo.phone_number || "N/A"}</span>
                        </a>
                    </div>

                    {/* Description */}
                    <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 leading-relaxed">
                        {investorInfo?.investor_preferences?.description || "N/A"}
                    </p>

                    {/* Preferred Locations */}
                    <div className="mt-4 sm:mt-6">
                        <div className="flex items-center gap-2 text-gray-900 mb-2">
                            <MapPin className="w-4 sm:w-5 h-4 sm:h-5" />
                            <h2 className="font-semibold text-sm sm:text-base">Preferred Locations</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {investorInfo?.investor_preferences?.preferred_locations?.length > 0 ? (
                                investorInfo.investor_preferences.preferred_locations.map((location) => (
                                    <span
                                        key={location.id}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        {location.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs sm:text-sm text-gray-500">Not Given</span>
                            )}
                        </div>
                    </div>

                    {/* Preferred Industries */}
                    <div className="mt-4 sm:mt-6">
                        <div className="flex items-center gap-2 text-gray-900 mb-2">
                            <Briefcase className="w-4 sm:w-5 h-4 sm:h-5" />
                            <h2 className="font-semibold text-sm sm:text-base">Preferred Industries</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {investorInfo?.investor_preferences?.preferred_industries?.length > 0 ? (
                                investorInfo.investor_preferences.preferred_industries.map((ind) => (
                                    <span
                                        key={ind.id}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        {ind.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs sm:text-sm text-gray-500">Not Given</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewInvestorProfile;