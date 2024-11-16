import React from 'react';
import { Routes, Route } from "react-router-dom";
import InvestorPrivateRoute from "./PrivateRoutes/InvestorPrivateRoutes";
import InvestorRegister from '../pages/Investor/InvestorRegister';
import InvestorLogin from '../pages/Investor/InvestorLogin';
import OtpInvestor from '../pages/Common/OtpInvestor';
import Home from '../pages/Investor/Home';

import FeedSection from '../pages/Investor/FeedSection';
import BusinessesSection from '../pages/Investor/BusinessesSection';
import MessagesSection from '../pages/Investor/MessagesSection';
import FavouritesSection from '../pages/Investor/MyPosts';
import MeetingsSection from '../pages/Investor/MeetingsSection';
import MeetingRecordingsSection from '../pages/Investor/MeetingRecordingsSection';
import NotificationsSection from '../pages/Investor/NotificationsSection';
import ProfileSection from '../pages/Investor/ProfileSection';
import InvestersView from '../pages/Investor/InvestersView';
import ViewBusiness from '../pages/Business/ViewBusiness';
import ViewInvestorProfile from '../pages/Business/ViewInvestrosProfile';

const InvestorRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<InvestorLogin />} />
      <Route path="/register" element={<InvestorRegister />} />
      <Route path="/otp-verification" element={<OtpInvestor />} />

      <Route element={<InvestorPrivateRoute />}>
        <Route path="/" element={<Home />}>
          <Route index element={<FeedSection />} /> 
          <Route path="businesses" element={<BusinessesSection />} />
          <Route path="businesses/:id" element={<ViewBusiness />} />
          <Route path="investors" element={<InvestersView />} />
          <Route path="investors/:id" element={<ViewInvestorProfile />} />
          <Route path="messages" element={<MessagesSection />} />
          <Route path="favourites" element={<FavouritesSection />} />
          <Route path="meetings" element={<MeetingsSection />} />
          <Route path="meeting-recordings" element={<MeetingRecordingsSection />} />
          <Route path="notifications" element={<NotificationsSection />} />
          <Route path="profile" element={<ProfileSection />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default InvestorRoutes;
