import React, { useState, useEffect } from 'react';
import { FaLocationArrow, FaIndustry, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import Drawer from '../../components/investor/Drawer';
import '../../assets/style.css';
import { fetchUserInfo } from '../../services/api/InvestorProfile';
import { BASE_URL_IMG } from '../../constents';
import { FaKey } from 'react-icons/fa'
import OffcanvasChangePassword from '../../components/investor/OffcanvasChangePassword';
import ConfirmationModal from '../../components/investor/ConfirmationModal';
import {useNavigate } from 'react-router-dom'
import FollowStats from '@/src/components/Common/FollowStats';

import { fetchUserConnections } from '@/src/services/api/business/Connections';


const ProfileSection = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [userInfo, setUserInfo] = useState({})
	const [loading, setLoading] = useState(false);
	const [isCanvasOpen, setIsCanvasOpen] = useState(false);
	const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false); 
	const [followers, setFollowers] = useState([])
	const [following, setFollowing] = useState([])
	const navigate = useNavigate()
	
	useEffect(()=> {
		const fetchData = async () => {
			try {
				const response = await fetchUserConnections();
				setFollowers(response.followers)
				setFollowing(response.following)
				console.log(response);
				
			} catch (error) {
				console.log(error);
				
			}
		}
		fetchData();
	}, [])
	
	const loadData = async () => {
		setLoading(true);
		try {
			const userInfo = await fetchUserInfo();
			setUserInfo(userInfo);
		} catch (error) {
			console.log(error);

		} finally {
			setLoading(false);
		}
	}
	const onProfileUpdate = () => {
		loadData();  
	};

	useEffect(() => {
		loadData();
	}, [])

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};
	const handleOpenCanvas = () => {
		setIsCanvasOpen(true);
	};
	const handleCloseCanvas = () => {
		setIsCanvasOpen(false);
	};
	const handleOpenModal = () => {
		setIsLogoutConfirmOpen(true)
	};
	const handleCloseModal = () => {
		setIsLogoutConfirmOpen(false);
	}
	const handleLogout = () => {
		try {
			localStorage.clear();
			navigate('../../../investor/login')
		} catch (error) {
			console.error('Error during logout:', error);

		}finally {
			handleCloseModal();
		}
	}
	
	const hasFullProfile = userInfo.investor_preferences?.description && userInfo.investor_preferences?.preferred_locations.length > 0 && userInfo.investor_preferences?.preferred_industries.length > 0;
	const completionPercentage = hasFullProfile ? 100 : 30;

	return (
		<div className="mt-1 max-h-[650px] overflow-y-scroll scrollbar-hide pb-20">
			<section className="relative p-6 bg-white rounded-lg shadow-lg">
				{!hasFullProfile && (
					<div className="absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-70 flex flex-col items-center justify-center ">
						<p className="text-gray-900 text-lg mb-2">Your profile is {completionPercentage}% completed.</p>
						<p className="text-gray-700 mb-4">Please complete your profile by adding more details.</p>

						<div className='flex space-x-1'>
						<button className="edit-button" onClick={toggleDrawer}>
							<svg className="edit-svgIcon" viewBox="0 0 512 512">
								<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
							</svg>
						</button>


						<button
							onClick={handleOpenModal}
							className="bg-red-500 text-white px-5 rounded-full hover:bg-red-600 flex items-center"
						>
							<FaSignOutAlt className="mr-2" />
							Logout
						</button>
						</div>
					</div>


				)}
				<img
					src={BASE_URL_IMG + userInfo.investor_preferences?.cover_image}
					alt="cover-image"
					className="w-full absolute top-0 left-0 z-0 h-52 object-cover rounded-t-lg"
				/>
				<div className="relative z-10 pt-32">
					<div className="flex items-center justify-center sm:justify-start mb-3">
						<img
							src={BASE_URL_IMG + userInfo.investor_preferences?.avatar_image}
							alt="user-avatar-image"
							className="border-4 border-white rounded-full w-36 h-36 object-cover"
						/>
					</div>
					<div className="text-center sm:text-left">
						<div className="flex items-center justify-between">
							<h3 className="text-2xl font-bold text-gray-900">{userInfo.full_name}</h3>

							{hasFullProfile && (

								<div className='flex gap-x-2'>
									<button className="edit-button" onClick={toggleDrawer}>
										<svg className="edit-svgIcon" viewBox="0 0 512 512">
											<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
										</svg>
									</button>
									<div>
										<button
											type="button"
											className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-700"
											onClick={handleOpenCanvas}
										>
											<FaKey color="white" className="m-1" />
										</button>

										{isCanvasOpen && (
											<OffcanvasChangePassword isOpen={isCanvasOpen} onClose={handleCloseCanvas} />
										)}
									</div>
								</div>


							)}
						</div>
						<p className="text-blue-600">{userInfo.email}</p>
						<p className="text-gray-700">+91 {userInfo.phone_number}</p>
						<div className=''>
						<FollowStats followers={followers} following={following} />
						</div>


						{hasFullProfile ? (
							<>
								<p className="mt-4 text-gray-700 flex">{userInfo.investor_preferences?.description}</p>
								<div className="mt-4">
									<h4 className="text-base font-semibold text-gray-800 flex items-center">
										<FaLocationArrow className="mr-2" /> Preferred Locations:
									</h4>
									<div className="flex flex-wrap gap-4 mt-2">
										{userInfo.investor_preferences?.preferred_locations?.map((location, index) => (
											<div key={index} className="flex-shrink-0 text-gray-700 text-sm bg-gray-100 px-4 py-2 rounded-full">
												{location?.name}
											</div>
										))}
									</div>
								</div>
								<div className="mt-5">
									<h4 className="text-base font-semibold text-gray-800 flex items-center">
										<FaIndustry className="mr-2" /> Preferred Industries
									</h4>
									<div className="flex flex-wrap gap-4 mt-2">
										{userInfo.investor_preferences?.preferred_industries.map((industry, index) => (
											<div key={index} className="flex-shrink-0 text-gray-700 text-sm bg-gray-100 px-4 py-2 rounded-full">
												{industry?.name}
											</div>
										))}
									</div>
								</div>
							</>
						) : (
							<div className="mt-4">
								<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-blue-500"
										style={{ width: `${completionPercentage}%` }}
									></div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className={hasFullProfile? "mt-5": "hidden"}>
					<button
						onClick={handleOpenModal}
						className="bg-red-500 text-white py-2  px-3 rounded-full hover:bg-red-600 flex items-center"
					>
						<FaSignOutAlt className="" /> Logout
						
					</button>
				</div>
			</section>
			<Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} onProfileUpdate={onProfileUpdate} />
			<ConfirmationModal isOpen={isLogoutConfirmOpen} onClose={handleCloseModal} onConfirm={handleLogout}
      />
		</div>
	);
};

export default ProfileSection;
