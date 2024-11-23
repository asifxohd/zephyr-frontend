import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIndividualBusinessInfo } from '@/src/services/api/admin/businessInfoapis';
import { individualInvestorUserInfo } from '@/src/services/api/admin/InvesterInfoapis';
import { fetchUserRole } from '@/src/services/api/business/userManagerapis';
import ViewBusiness from '../Business/ViewBusiness';
import ViewInvestorProfile from '../Business/ViewInvestrosProfile';
import { Loader2 } from 'lucide-react';

const UserProfile = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // First, fetch the user's role
                const roleResponse = await fetchUserRole(id);
                const { role } = roleResponse;
                setUserRole(role);

                // Then fetch the appropriate data based on the role
                let data;
                if (role === 'investor') {
                    data = await individualInvestorUserInfo(id);
                } else if (role === 'business') {
                    data = await getIndividualBusinessInfo(id);
                } else {
                    throw new Error(`Invalid role: ${role}`);
                }

                setUserData(data);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching user data');
                console.error('Error fetching user data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md text-center">
                    <h3 className="font-semibold mb-2">Error Loading Profile</h3>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    if (!userData || !userRole) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg max-w-md text-center">
                    <h3 className="font-semibold mb-2">No Data Available</h3>
                    <p className="text-sm">Could not find user profile information.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {userRole === 'business' ? (
                    <ViewBusiness />
                ) : userRole === 'investor' ? (
                    <ViewInvestorProfile />
                ) : null}
            </div>
        </div>
    );
};

export default UserProfile;