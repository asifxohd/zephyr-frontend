import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Globe, MessageCircle, Users } from 'lucide-react';
import { getIndividualBusinessInfo } from '@/src/services/api/admin/businessInfoapis';
import { useParams } from 'react-router-dom';
import { BASE_URL, BASE_URL_IMG } from '@/src/constents';
import { Button } from '@/components/ui/button';
import { handleFollow, handleUnfollow, checkFollowStatus, fetchFollowingAndUnfollowingForUser } from '@/src/services/api/business/Connections';
import FollowStats from '@/src/components/Common/FollowStats';

const ViewBusiness = () => {
    const [businessData, setBusinessData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getIndividualBusinessInfo(id);
                setBusinessData(response);
                const followStatus = await checkFollowStatus(id); 
                setIsFollowing(followStatus);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

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

    const toggleFollow = async () => {
        console.log(id);
        try {
            if (!isFollowing){
                const response = await handleFollow(id)
                setIsFollowing(true); 
                console.log(response.detail); 

            }else {
                const response = await handleUnfollow(id)
                setIsFollowing(false);
                console.log(response.detail); 
            }

        } catch (error) {
            console.error('Error in follow/unfollow action:', error);
        }
    }

    const handleChat = () => {
        console.log('Opening chat...');
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

    if (!businessData) return <div>Loading...</div>;

    const { business_preferences: prefs = {}, documents = [], video_pitch: video = {}, user = {} } = businessData;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full">
                {/* Cover Image */}
                <div className="relative sm:h-40 md:h-48 lg:h-56 w-full bg-blue-900">
                    <img
                        src={BASE_URL_IMG + prefs?.cover_image || "Not given"}
                        alt="Cover"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="relative  mb-6">
                        <div className="flex  flex-col sm:flex-row items-center sm:items-end gap-4 pt-4">
                            <img
                                src={BASE_URL_IMG + prefs?.avatar_image || "Not given"}
                                alt="Company Logo"
                                className="w-24 h-24 bg-cover sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-lg border-4 border-white shadow-xl bg-white"
                            />
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                                    <div className="space-y-2">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-black">
                                            {prefs?.company_name || "Not given"}
                                        </h1>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                {prefs?.industry || "Not given"}
                                            </span>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                {user?.status ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                        {/* Followers Section */}
                                        <div className="flex items-center justify-center sm:justify-start gap-4 text-sm">
                                        <FollowStats followers={followers} following={following} />

                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-center sm:justify-end gap-2 mt-4 sm:mt-0">
                                        {isFollowing && (
                                            <Button
                                                onClick={handleChat}
                                                className="w-28 sm:w-32 bg-blue-600 text-white hover:bg-blue-700"
                                            >
                                                <MessageCircle className="w-4 h-4 mr-2" />
                                                Chat
                                            </Button>
                                        )}
                                        <Button
                                            onClick={toggleFollow}
                                            className={`w-28 sm:w-32 ${isFollowing
                                                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }`}
                                        >
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-12">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                            {/* About Section */}
                            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {prefs?.company_description || "Not given"}
                                </p>
                            </div>

                            {/* Documents Section */}
                            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
                                <div className="space-y-4">
                                    {documents.length ? (
                                        documents.map((doc) => (
                                            <div key={doc.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                                <img
                                                    src={doc.image_url || "https://img.freepik.com/free-vector/document-vector-colorful-design_341269-1262.jpg?w=360"}
                                                    alt=""
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                                <div className="flex flex-col flex-1">
                                                    <h3 className="font-semibold text-gray-900">{doc.document_title || "Not given"}</h3>
                                                    <p className="text-gray-500 text-sm mt-1">{doc.document_description || "Not given"}</p>
                                                    <button
                                                        onClick={() => window.open(BASE_URL_IMG + doc.document_file, "_blank")}
                                                        className="mt-2 text-blue-500 hover:text-blue-600 underline text-sm"
                                                    >
                                                        Open Document
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Not given</p>
                                    )}
                                </div>
                            </div>

                            {/* Video Section */}
                            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Pitch</h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900">{video?.video_title || "not given"}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{video?.video_description || "Not given"}</p>
                                    {video?.video_file ? (
                                        <div className="mt-2 aspect-video">
                                            <video controls className="w-full h-full rounded-lg">
                                                <source src={BASE_URL_IMG + video?.video_file} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 mt-2">Not given</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                            {/* Contact Information */}
                            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <span className="break-all">{businessData.email || "Not given"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <span>{businessData.phone_number || "Not given"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <span>{prefs?.location || "Not given"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Business Details */}
                            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Details</h2>
                                <div className="space-y-3">
                                    {[
                                        ["Business Type", prefs?.business_type],
                                        ["Company Stage", prefs?.company_stage],
                                        ["Employee Count", prefs?.employee_count],
                                        ["Seeking Amount", prefs?.seeking_amount ? `$${parseFloat(prefs.seeking_amount).toLocaleString()}` : null],
                                        ["Annual Revenue", prefs?.annual_revenue ? `$${parseFloat(prefs.annual_revenue).toLocaleString()}` : null]
                                    ].map(([label, value]) => (
                                        <div className="flex justify-between text-gray-600 flex-wrap gap-2" key={label}>
                                            <span className="font-medium">{label}</span>
                                            <span className="text-gray-900">{value || "Not given"}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Links</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <a href={prefs?.linkedIn || "#"} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                                        <Linkedin className="w-5 h-5 flex-shrink-0" />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a href={prefs?.facebook || "#"} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                                        <Facebook className="w-5 h-5 flex-shrink-0" />
                                        <span>Facebook</span>
                                    </a>
                                    <a href={prefs?.twitter || "#"} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                                        <Twitter className="w-5 h-5 flex-shrink-0" />
                                        <span>Twitter</span>
                                    </a>
                                    <a href={prefs?.website || "#"} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                                        <Globe className="w-5 h-5 flex-shrink-0" />
                                        <span>Website</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBusiness;