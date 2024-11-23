import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Briefcase, 
  UserPlus, 
  Check, 
  Share2, 
  MessageSquare, 
  Star,
  ExternalLink
} from 'lucide-react';
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
    <div className="relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header Banner - Gradient Background */}
      <div className="h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
      
      <div className="px-6 pb-6">
        {/* Profile Image - Overlapping Banner */}
        <div className="relative -mt-12 mb-4">
          <img
            src={business.avatar_image}
            alt={business.company_name}
            className="w-24 h-24 rounded-xl border-4 border-white object-cover shadow-lg"
          />
        </div>

        {/* Company Info Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            <h3 
              onClick={() => navigate(`${business.user_id}`)}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer flex items-center gap-2"
            >
              {business.company_name}
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </h3>
            
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">{business.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">{business.industry}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleFollowToggle}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                isFollowing 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isFollowing ? (
                <Check className="w-4 h-4" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {isExpanded ? business.about_description :
            business.about_description?.slice(0, 100) + (business?.about_description?.length > 100 ? '...' : '')}
          {business.about_description?.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 ml-1 hover:text-blue-700 font-medium"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>

        {/* Tags */}
        {business.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {business.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Message</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;