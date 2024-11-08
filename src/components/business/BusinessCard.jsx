import React, { useState } from 'react';
import { MapPin, Briefcase, UserPlus } from 'lucide-react';

const BusinessCard = ({ business, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-900">
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

            {/* Connect Button */}
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded flex items-center text-sm hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-1" />
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;