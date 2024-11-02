import React, { useEffect, useState } from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import { FaLinkedin, FaFacebook, FaTwitter, FaTrash } from "react-icons/fa";
import '../../assets/style.css'
import EditProfileDrawer from '../../components/business/EditProfileDrawer';
import { fetchData, deleteDocument } from '../../services/api/business/Profile';
import { BASE_URL } from '../../constents';
import DeleteConfirmationModal from '../../components/Alerts/DeleteConfirmationModal';
import VideoPlayer from '../../components/VedioPlayer/VideoPlayer';



const CompanyProfile = () => {
	const [userInfo, setUserInfo] = useState([])
	const [documents, setDocuments] = useState([])
	const [activeTab, setActiveTab] = useState('About');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);
	const [titleData, setTitleData] = useState({ title: '', id: '' })


	const openModal = (text, id) => {
		setModalOpen(true);
		setTitleData({ title: text, id: id });
	}
	const closeModal = () => setModalOpen(false);

	const handleEditClick = () => {
		setIsDrawerOpen(true);
	};

	const handleRefresh = () => setRefresh(!refresh);

	const handleCloseDrawer = () => {
		setIsDrawerOpen(false);
		setRefresh(!refresh);
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetchData()
				console.log(response);
				setUserInfo(response)
				setDocuments(response.documents || [])
			} catch (error) {
				console.log(error);

			}
		}
		getData();
	}, [refresh])


	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden w-full mx-auto">

			{/* <div className="py-3  bg-gray-100">
				<nav className="flex" aria-label="Breadcrumb">
					<ol className="inline-flex items-center text-gray-700">
						<li className="inline-flex items-center">
							<span className="text-sm font-medium">Business</span>
						</li>
						<li>
							<div className="flex items-center">
								<IoMdArrowDropright />
								<span className="text-sm text-black font-medium">Profile Management</span>
							</div>
						</li>
					</ol>
				</nav>
			</div> */}

			{/* Profile Section */}
			<div className="relative">
				<img
					src={userInfo?.business_preferences?.cover_image ? BASE_URL + userInfo.business_preferences?.cover_image : "https://www.munathara.com/sites/default/files/default_images/default-banner_0.png"}
					alt="Company Cover"
					className="w-full h-52 object-cover"
				/>
				<div className="absolute top-44 left-10 transform -translate-y-1/2">
					<img
						src={userInfo?.business_preferences?.avatar_image ? BASE_URL + userInfo.business_preferences?.avatar_image : "https://www.munathara.com/sites/default/files/default_images/default-banner_0.png"}
						alt="Company Logo"
						className="w-32 h-32 border-4 border-white"
					/>
				</div>
			</div>

			<div className="p-5">
				<div className="flex items-center justify-between pl-6 p-4">
					<div>
						<h2 className="text-2xl font-bold text-gray-800">{userInfo?.business_preferences?.company_name ? userInfo?.business_preferences?.company_name : "N/A"}</h2>
						<p className="text-sm text-gray-500"><b>{userInfo?.business_preferences?.business_type ? userInfo?.business_preferences?.business_type : "N/A"}</b></p>
						<p className="text-sm text-gray-500">{userInfo?.business_preferences?.industry ? userInfo?.business_preferences?.industry : "N/A"}</p>

						{/* Email and Mobile Number */}
						<div className="mt-2">
							<p className="text-sm text-gray-500">
								<strong className="text-gray-800">Email:</strong>
								<a href="mailto:info@rmoney.com" className="text-blue-600 hover:underline"> {userInfo.email ? userInfo.email : "company@gmail.com"}</a>
							</p>
							<p className="text-sm text-gray-500">
								<strong className="text-gray-800">Mobile:</strong>
								<a href="tel:+919876543210" className="text-blue-600 hover:underline"> {userInfo.phone_number ? userInfo.phone_number : "mobile number"} </a>
							</p>
						</div>
					</div>

					<div className="flex space-x-2">
						<div>
							<button onClick={handleEditClick} className="edit-button bg-black">
								<svg className="edit-svgIcon" viewBox="0 0 512 512">
									<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
								</svg>
							</button>
						</div>
						<button className="bg-green-600 hover:bg-green-800 rounded-3xl text-white px-4 py-2 ">Activate</button>

					</div>
				</div>

				{/* Tab Navigation */}
				<div className="border-t space-x-5 flex pl-5 pt-4 text-gray-700">
					<h3
						onClick={() => setActiveTab('About')}
						className={`text-base font-semibold py-1 px-4 cursor-pointer ${activeTab === 'About' ? 'text-white bg-black rounded-2xl' : 'text-gray-500'}`}
					>
						About
					</h3>
					<h3
						onClick={() => setActiveTab('Documents')}
						className={`text-base font-semibold px-4 py-1 cursor-pointer ${activeTab === 'Documents' ? 'text-white bg-black rounded-2xl' : 'text-gray-500'}`}
					>
						Documents
					</h3>
					<h3
						onClick={() => setActiveTab('Video Pitch')}
						className={`text-base font-semibold px-4 py-1 cursor-pointer ${activeTab === 'Video Pitch' ? 'text-white bg-black rounded-2xl' : 'text-gray-500'}`}
					>
						Video Pitch
					</h3>
				</div>

				{/* Tab Content */}
				{activeTab === 'About' && (
					<div className="p-6 bg-white rounded-lg ">
						{/* Company Description */}
						<h4 className="text-xl font-bold text-gray-900 mb-4">About Us</h4>
						<p className="text-gray-700 leading-relaxed mb-6">
							{userInfo?.business_preferences?.company_description ? userInfo?.business_preferences?.company_description : "Please describe your company here. Share your story, mission, and vision. Include details about your products or services, your target audience, and what makes your business unique. This is your chance to showcase your brand's identity and values!"}</p>

						{/* Company Information Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
							{/* Title */}
							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Title:</strong>
								<span className="text-gray-600">{userInfo?.business_preferences?.company_name ? userInfo?.business_preferences?.company_name : "COMPANY NAME"}</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Industry:</strong>
								<span className="text-gray-600">{userInfo?.business_preferences?.industry ? userInfo?.business_preferences?.industry : "N/A"}</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Location:</strong>
								<span className="text-gray-600">{userInfo?.business_preferences?.location ? userInfo?.business_preferences?.location + ", India" : "N/A"}</span>

							</div>
							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Website:</strong>
								<a target='_blank' href={userInfo?.business_preferences?.website ? userInfo?.business_preferences?.website : "https://www.google.com/"} className="text-blue-500 underline">{userInfo?.business_preferences?.website ? userInfo?.business_preferences?.website : "COMPANY WEBSITE"}</a>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Business Type:</strong>
								<span className="text-gray-600">{userInfo?.business_preferences?.business_type ? userInfo?.business_preferences?.business_type : "N/A"}</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Product Type:</strong>
								<span className="text-gray-600">{userInfo?.business_preferences?.product_type ? userInfo?.business_preferences?.product_type : "N/A"}</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Company Stage:</strong>
								<span className="text-gray-600">{userInfo?.business_preferences?.company_stage ? userInfo?.business_preferences?.company_stage : "N/A"}</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Annual Revenue:</strong>
								<span className="text-gray-600">{userInfo?.business_preferences?.annual_revenue ? userInfo?.business_preferences?.annual_revenue : "N/A"}</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Seeking Amount:</strong>
								<span className="text-gray-600">{userInfo?.business_preferences?.seeking_amount ? userInfo?.business_preferences?.seeking_amount : "N/A"}</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Employee Count:</strong>
								<span className="text-gray-600">{userInfo?.business_preferences?.employee_count ? userInfo?.business_preferences?.employee_count : "N/A"}</span>
							</div>
						</div>

						{/* Social Media Links */}
						<div className="mt-6 border-t pt-4">
							<strong className="block mb-2 text-gray-800">Social Media:</strong>
							<div className="flex space-x-6">
								<a href={userInfo?.business_preferences?.linkedIn ? userInfo?.business_preferences?.linkedIn : "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="text-black space-x-1 flex font-bold hover:underline">
									<FaLinkedin size={24} /> <span>LinkedIn</span>
								</a>
								<a href={userInfo?.business_preferences?.facebook ? userInfo?.business_preferences?.facebook : "https://www.facebook.com"} target="_blank" rel="noopener noreferrer" className="text-black space-x-1 flex font-bold hover:underline">
									<FaFacebook size={24} /> <span>Facebook</span>
								</a>
								<a href={userInfo?.business_preferences?.twitter ? userInfo?.business_preferences?.twitter : "https://www.twitter.com"} target="_blank" rel="noopener noreferrer" className="text-black space-x-1 flex font-bold hover:underline">
									<FaTwitter size={24} /> <span>Twitter</span>
								</a>
							</div>
						</div>

					</div>
				)}

				{activeTab === 'Documents' && (
					<div className="p-6 md:pl-8 bg-white rounded-lg space-y-6">
						<h4 className="text-xl font-bold text-gray-900 mb-4">Documents</h4>

						{/* Introductory Description */}
						<p className="text-gray-700 leading-relaxed">
							Below is a collection of critical business documents, including financial reports, operational strategies, and market analyses. These documents provide insights into the company's performance, goals, and plans for growth. They are intended to help investors, partners, and analysts understand key business metrics, evaluate the company’s potential, and make informed decisions. Each document can be reviewed in detail by clicking on the corresponding file.
						</p>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
							{documents && documents.length > 0 ? (
								documents.map((doc, index) => (

									<div key={index} className="flex flex-col p-4 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 relative">
										<img
											className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
											src="https://t4.ftcdn.net/jpg/02/96/74/67/360_F_296746771_DqcJL5s7VFO5ZB3IgzeNyzMyHsrAnBjq.jpg"
											alt="document image"
										/>
										<div className="flex flex-col justify-between md:p-4 leading-normal">
											<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800">
												{doc.document_title ? `${doc.document_title.substring(0, 40)}...` : ''}
											</h5>
											<p className="mb-3 font-normal text-xs text-gray-500">
												{doc.document_description ? `${doc.document_description.substring(0, 180)}...` : ''}
											</p>
											<a
												href={BASE_URL + doc.document_file}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-400 text-xs cursor-pointer"
											>
												<b>Open Document</b>
											</a>
										</div>
										<div className="absolute top-2 right-2">
											<button onClick={() => { openModal(doc.document_title, doc.id) }} className=''>
												<FaTrash size={20} color='red' />
											</button>
										</div>
									</div>

								))
							) : (
								<div className="col-span-full text-center p-4 bg-gray-200 rounded-lg shadow-md">
									<p className="text-lg text-gray-600">No documents available. Please add some documents.</p>
								</div>
							)}
						</div>
					</div>
				)}



				{activeTab === 'Video Pitch' && (
					<div className="p-6 bg-white rounded-lg space-y-6">
						<h4 className="text-xl font-bold text-gray-900 mb-4">Video Pitch</h4>

						<p className="text-gray-700 leading-relaxed">
							Here is a video pitch providing an overview of the company, its goals, vision, and the potential for future growth. The pitch offers insights into the unique value the business brings to its market and how it aims to address key industry challenges.
						</p>

						<div className="flex flex-col sm:flex-row items-start p-4 bg-gray-100 rounded-lg  space-y-4 sm:space-y-0 sm:space-x-6">

							<div className="w-full sm:w-1/2">
								<div className="relative">
									{userInfo && userInfo?.video_pitch?.video_file ? (
										<VideoPlayer url={BASE_URL + userInfo.video_pitch.video_file} />
									) :
										"No video Found"
									}
								</div>
							</div>

							<div className="flex flex-col justify-center  w-full sm:w-1/2">
								<h5 className="text-lg font-semibold text-gray-900 mb-2">{userInfo?.video_pitch?.video_title ? (userInfo?.video_pitch?.video_title) : "your video pitch heading "}</h5>
								<p className="text-sm text-gray-700">
									{userInfo?.video_pitch?.video_description ? (userInfo?.video_pitch?.video_description) : "your video pitch description "}
								</p>
							</div>
						</div>

					</div>
				)}
			</div>

			<EditProfileDrawer
				isOpen={isDrawerOpen}
				onClose={handleCloseDrawer}
			/>

			<DeleteConfirmationModal
				isOpen={isModalOpen}
				onClose={closeModal}
				deleteAction={deleteDocument}
				data={titleData}
				handleRefresh={handleRefresh}
			/>
		</div>
	);
};

export default CompanyProfile;
