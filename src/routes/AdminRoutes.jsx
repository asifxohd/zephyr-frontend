import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminLogin from '../pages/Admin/AdminLogin';
import AdminPrivateRoute from './PrivateRoutes/AdminPrivateRoutes';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Businesses from '../pages/Admin/Businesses';
import Investors from '../pages/Admin/Investors';
import ManageSubscriptions from '../pages/Admin/ManageSubscriptions';
import SalesReport from '../pages/Admin/SalesReport';
import InvestorProfileView from '../pages/Admin/InvestorProfileView';
import BusinessProfile from '../pages/Admin/BusinessProfileView';

const AdminRoutes = () => {
	return (
		<>
			 <Routes>
                <Route path="/login" element={<AdminLogin/>} />
                <Route path="*" element={<AdminPrivateRoute/>}>
                    <Route path="dashboard" element={<AdminDashboard/>} />
                    <Route path="sales-report" element={<SalesReport/>} />
                    <Route path="investors" element={<Investors/>} />
                    <Route path="investors/:id" element={<InvestorProfileView/>} />
                    <Route path="businesses" element={<Businesses/>} />
                    <Route path="businesses/:id" element={<BusinessProfile/>} />
                    <Route path="subscriptions" element={<ManageSubscriptions/>} />
                </Route>
            </Routes>
		</>
	)
}

export default AdminRoutes