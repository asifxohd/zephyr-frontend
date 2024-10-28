import React, { useState } from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import '../../assets/style.css'
import EditProfileDrawer from '../../components/business/EditProfileDrawer';


const CompanyProfile = () => {
	const [activeTab, setActiveTab] = useState('About');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	
	const handleEditClick = () => {
		setIsDrawerOpen(true);
	  };
	
	  const handleCloseDrawer = () => {
		setIsDrawerOpen(false);
	  };

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden w-full mx-auto">
			{/* Simple Breadcrumbs without Links */}
			<div className="py-3  bg-gray-100">
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
			</div>

			{/* Profile Section */}
			<div className="relative">
				<img
					src="https://www.shutterstock.com/image-vector/black-red-geometric-corporate-banner-260nw-1410629855.jpg"
					alt="Company Cover"
					className="w-full h-52 object-cover"
				/>
				<div className="absolute top-44 left-10 transform -translate-y-1/2">
					<img
						src="https://blancfestival.com/wp-content/uploads/2022/05/Nike_1985_cuadrado_rojo.png"
						alt="Company Logo"
						className="w-32 h-32 border-4 border-white"
					/>
				</div>
			</div>

			<div className="p-5">
				<div className="flex items-center justify-between pl-6 p-4">
					<div>
						<h2 className="text-2xl font-bold text-gray-800">RMoney</h2>
						<p className="text-sm text-gray-500">Investment Khushiyon Ka</p>
						<p className="text-sm text-gray-500">Financial Services · Agra, Uttar Pradesh</p>

						{/* Email and Mobile Number */}
						<div className="mt-2">
							<p className="text-sm text-gray-500">
								<strong className="text-gray-800">Email:</strong>
								<a href="mailto:info@rmoney.com" className="text-blue-600 hover:underline">info@rmoney.com</a>
							</p>
							<p className="text-sm text-gray-500">
								<strong className="text-gray-800">Mobile:</strong>
								<a href="tel:+919876543210" className="text-blue-600 hover:underline">+91 98765 43210</a>
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
							It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
						</p>

						{/* Company Information Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
							{/* Title */}
							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Title:</strong>
								<span className="text-gray-600">RMoney</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Industry:</strong>
								<span className="text-gray-600">Financial Services</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Country:</strong>
								<span className="text-gray-600">India</span>

							</div>
							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Website:</strong>
								<a href="https://www.rmoney.com" className="text-blue-500 underline">www.rmoney.com</a>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Business Type:</strong>
								<span className="text-gray-600">Private</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Product Type:</strong>
								<span className="text-gray-600">Investment Solutions</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Company Stage:</strong>
								<span className="text-gray-600">Growth</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Annual Revenue:</strong>
								<span className="text-gray-600">$50M</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Seeking Amount:</strong>
								<span className="text-gray-600">$10M</span>
							</div>

							<div className="flex items-center space-x-2">
								<strong className=" text-gray-800">Employee Count:</strong>
								<span className="text-gray-600">201-500 employees</span>
							</div>
						</div>

						{/* Social Media Links */}
						<div className="mt-6 border-t pt-4">
							<strong className="block mb-2 text-gray-800">Social Media:</strong>
							<div className="flex space-x-6">
								<div className="text-black space-x-1 flex font-bold hover:underline" >
									<FaLinkedin size={24} /> <span>LinkedIn</span>
								</div>
								<div className="text-black space-x-1 flex font-bold hover:underline">
									<FaFacebook size={24} />
									<span>Facebook</span>
								</div>
								<div className="text-black space-x-1 flex font-bold hover:underline" >
									<FaTwitter size={24} />

									<span>Twitter</span>
								</div>
							</div>
						</div>
					</div>
				)}
				{activeTab === 'Documents' && (
					<div className="p-6 md:pl-8 bg-white rounded-lg space-y-6">
						<h4 className="text-xl font-bold text-gray-900 mb-4">Documents</h4>

						{/* Introductory Description */}
						<p className="text-gray-700 leading-relaxed">
							Below is a collection of critical business documents, including financial reports, operational strategies, and market analyses. These documents provide insights into the company's performance, goals, and plans for growth.
							They are intended to help investors, partners, and analysts understand key business metrics, evaluate the company’s potential, and make informed decisions. Each document can be reviewed in detail by clicking on the corresponding file.
						</p>

						{/* Document List */}
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

							{/* Document 1 */}
							<div className="flex items-start p-4 bg-gray-100 rounded-lg shadow-md">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/GNOME_Documents_icon.svg/1024px-GNOME_Documents_icon.svg.png"
									alt="Document"
									className="w-12 h-12 mr-4"
								/>
								<div>
									<h5 className="text-lg font-semibold text-gray-900">Business Plan</h5>
									<p className="text-sm text-gray-600">
										A comprehensive document detailing the company's strategic plans, goals, and financial projections.
									</p>
									<button
										onClick={() => window.open('/path-to-business-plan.pdf')}
										className="mt-2 text-blue-500 hover:underline"
									>
										View Document
									</button>
								</div>
							</div>

							{/* Document 2 */}
							<div className="flex items-start p-4 bg-gray-100 rounded-lg shadow-md">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/GNOME_Documents_icon.svg/1024px-GNOME_Documents_icon.svg.png"
									alt="Document"
									className="w-12 h-12 mr-4"
								/>
								<div>
									<h5 className="text-lg font-semibold text-gray-900">Financial Report</h5>
									<p className="text-sm text-gray-600">
										This document provides a detailed breakdown of the company’s financial performance for the last fiscal year.
									</p>
									<button
										onClick={() => window.open('/path-to-financial-report.pdf')}
										className="mt-2 text-blue-500 hover:underline"
									>
										View Document
									</button>
								</div>
							</div>

							{/* Document 3 */}
							<div className="flex items-start p-4 bg-gray-100 rounded-lg shadow-md">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/GNOME_Documents_icon.svg/1024px-GNOME_Documents_icon.svg.png"
									alt="Document"
									className="w-12 h-12 mr-4"
								/>
								<div>
									<h5 className="text-lg font-semibold text-gray-900">Market Analysis</h5>
									<p className="text-sm text-gray-600">
										An analysis of the industry and market trends, highlighting opportunities and challenges for future growth.
									</p>
									<button
										onClick={() => window.open('/path-to-market-analysis.pdf')}
										className="mt-2 text-blue-500 hover:underline"
									>
										View Document
									</button>
								</div>
							</div>

							{/* Add more documents here if needed */}

						</div>
					</div>
				)}

				{activeTab === 'Video Pitch' && (
					<div className="p-6 bg-white rounded-lg space-y-6">
						<h4 className="text-xl font-bold text-gray-900 mb-4">Video Pitch</h4>

						{/* Introductory Description */}
						<p className="text-gray-700 leading-relaxed">
							Here is a video pitch providing an overview of the company, its goals, vision, and the potential for future growth. The pitch offers insights into the unique value the business brings to its market and how it aims to address key industry challenges.
						</p>

						{/* Video Pitch Card */}
						<div className="flex flex-col sm:flex-row items-start p-4 bg-gray-100 rounded-lg shadow-md space-y-4 sm:space-y-0 sm:space-x-6">

							{/* Video Container */}
							<div className="w-full sm:w-1/2">
								<div className="relative">
									<video
										controls
										className="w-full h-60 rounded-md shadow-lg"
										poster="https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4"
									>
										<source src="https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4" type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								</div>
							</div>

							{/* Video Information */}
							<div className="flex flex-col justify-center  w-full sm:w-1/2">
								<h5 className="text-lg font-semibold text-gray-900 mb-2">Our Company Vision & Growth Strategy</h5>
								<p className="text-sm text-gray-700">
									This video offers a comprehensive overview of our business vision, market position, and strategies for scaling our operations. We aim to transform the industry with innovative solutions and a focus on sustainable growth.
								</p>
							</div>
						</div>

					</div>
				)}



			</div>
			<EditProfileDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />

		</div>
	);
};

export default CompanyProfile;
