import {  BASE_URL_IMG } from '@/src/constents';
import { fetchFollowSuggessions, handleFollow, handleUnfollow } from '@/src/services/api/business/Connections';
import { Check, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersToFollow = () => {
	const [sampleUsers, setSampleUsers] = useState([]);
	const [followStatus, setFollowStatus] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchFollowSuggessions();
				setSampleUsers(response);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const handleFollowToggle = async (id) => {
		try {
			const currentFollowStatus = followStatus[id];
			if (currentFollowStatus) {
				await handleUnfollow(id);
			} else {
				await handleFollow(id);
			}
			setFollowStatus((prevState) => ({
				...prevState,
				[id]: !currentFollowStatus,
			}));
		} catch (error) {
			console.error('Error toggling follow status:', error);
		}
	};


	const handleNavigateToProfile = (user) => {
		navigate(`user/profile/${user.id}`);
	};

	return (
		<div className="">
			<div className="pl-6">
				<h3 className="text-xl font-semibold font-sans text-gray-900">Suggested Follows</h3>
			</div>
			<div className="p-4">
				<ul className="space-y-4">
					{sampleUsers.map((user) => {
						const isFollowing = followStatus[user.id] || false; 

						return (
							<li onClick={() => handleNavigateToProfile(user)} key={user.email} className="flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
								<div className="relative h-12 w-12">
									<img
										src={user.avatar_image ? BASE_URL_IMG + user.avatar_image : ''}
										alt={user.name}
										className="h-full w-full rounded-full object-cover"
									/>
									{!user.avatar_image && (
										<div className="absolute inset-0 flex items-center justify-center text-white bg-green-500 rounded-full text-xs">
											{user.name.slice(0, 2).toUpperCase()}
										</div>
									)}
								</div>

								<div className="flex-1 min-w-0">
									<p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
									<p className="text-sm text-gray-500 truncate">{user.email.split('@')[0]}</p>
								</div>

								<button
									onClick={() => handleFollowToggle(user.id)}
									className={`px-4 py-1.5 rounded-full text-xs flex items-center ${isFollowing ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
								>
									{isFollowing ? (
										<Check className="w-4 h-4 mr-1" />
									) : (
										<UserPlus className="w-4 h-4 mr-1" />
									)}
									{isFollowing ? 'Following' : 'Follow'}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default UsersToFollow;
