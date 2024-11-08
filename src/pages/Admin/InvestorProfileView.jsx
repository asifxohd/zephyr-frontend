import React, { useEffect, useState } from 'react';
import { Mail, Phone, Share2, MapPin, Briefcase, Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { individualInvestorUserInfo } from '@/src/services/api/admin/InvesterInfoapis';

const InvestorProfile = () => {
    const { id } = useParams();
    const [investorInfo, setInvestorsInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await individualInvestorUserInfo(id);
                setInvestorsInfo(response)
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return `Since ${formattedDate}`;
    };

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg ">
            {/* Cover Image */}
            <div className="relative h-52 w-full bg-gray-200">
                <img
                    src={investorInfo?.investor_preferences?.cover_image ? investorInfo.investor_preferences.cover_image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShhaKckoGwx48DVxoVZUCFNhvh3gJmh1MDlA&s"}
                    alt="Profile Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Profile Content */}
            <div className="relative px-10 pb-10 pt-1">
                {/* Avatar */}
                <div className="absolute -top-28 left-6">
                    <img
                        src={investorInfo?.investor_preferences?.avatar_image ? investorInfo.investor_preferences.avatar_image : ""}
                        alt={investorInfo.full_name}
                        className="w-40 h-40 border-4 border-white shadow-lg"
                    />
                </div>



                <div className="mt-20">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">{investorInfo.full_name}</h1>
                        <div className="flex items-center gap-4">
                            <span
                                className={`text-black px-3 rounded-full ${investorInfo.status ? 'bg-green-100' : 'bg-red-100'}`}>
                                {investorInfo.status ? 'Active' : 'Inactive'}
                            </span>

                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(investorInfo.date_joined)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-6 space-y-3">
                        <a
                            href={`mailto:${investorInfo.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            <span>{investorInfo.email}</span>
                        </a>
                        <a
                            href={`tel:${investorInfo.phone_number}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            <span>{investorInfo.phone_number ? investorInfo.phone_number : "N/A"}</span>
                        </a>
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        {investorInfo?.investor_preferences?.description ? (investorInfo?.investor_preferences?.description) : "N/A"}
                    </p>

                    {/* Preferred Locations */}
                    <div className="mt-6">
                        <div className="flex items-center gap-2 text-gray-900 mb-2">
                            <MapPin className="w-5 h-5" />
                            <h2 className="font-semibold">Preferred Locations</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {investorInfo?.investor_preferences?.preferred_locations && investorInfo.investor_preferences.preferred_locations.length > 0 ? (
                                investorInfo.investor_preferences.preferred_locations.map((location) => (
                                    <span
                                        key={location.id}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        {location.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">Not Given</span>
                            )}
                        </div>

                    </div>

                    {/* Preferred Industries */}
                    <div className="mt-6">
                        <div className="flex items-center gap-2 text-gray-900 mb-2">
                            <Briefcase className="w-5 h-5" />
                            <h2 className="font-semibold">Preferred Industries</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {investorInfo?.investor_preferences?.preferred_industries
                                && investorInfo?.investor_preferences?.preferred_industries.length > 0 ? (
                                investorInfo?.investor_preferences?.preferred_industries.map((ind) => (
                                    <span
                                        key={ind.id}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        {ind.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">Not Given</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorProfile;
