import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BusinessRegister from '../pages/Business/BusinessRegistration';
import BusinessLogin from '../pages/Business/BusinessLogin';
import OtpBusiness from '../pages/Common/OtpBusiness';
import BusinessPrivateRoutes from './PrivateRoutes/BusinessPrivateRoutes';
import Home from '../pages/Business/Home';
import ActiveInvestors from '../pages/Business/ActiveInvestors';
import JoinMeetings from '../pages/Business/JoinMeetings';
import ManageSubscriptions from '../pages/Business/ManageSubscriptions';
import Meetings from '../pages/Business/Meetings';
import Notifications from '../pages/Business/Notifications';
import Messages from '../pages/Business/Messages';
import FeedSection from '../pages/Business/FeedSection';
import ProfileSection from '../pages/Business/ProfileSection';

const BusinessRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<BusinessLogin />} />
            <Route path="/register" element={<BusinessRegister />} />
            <Route path="/otp-verification" element={<OtpBusiness />} />

            {/* Protected Routes */}
            <Route element={<BusinessPrivateRoutes />}>
                <Route path="/" element={<Home />}>
                    <Route index element={<FeedSection />} />
                    <Route path="investors" element={<ActiveInvestors />} />
                    <Route path="join-meetings" element={<JoinMeetings />} />
                    <Route path="subscriptions" element={<ManageSubscriptions />} />
                    <Route path="meetings" element={<Meetings />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="messages" element={<Messages />} />
					<Route path="profile" element={<ProfileSection />} />

                </Route>
            </Route>
        </Routes>
    );
};

export default BusinessRoutes;
