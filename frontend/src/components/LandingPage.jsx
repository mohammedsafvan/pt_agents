import React from "react";
import { Link } from "react-router-dom";
import {
	FaShieldAlt,
	FaCode,
	FaChartLine,
	FaUserSecret,
	FaLock,
	FaBug,
	FaServer,
	FaGithub,
	FaEnvelope,
} from "react-icons/fa";
import Footer from "./Footer";

import alexImage from "../assets/images/team/alex.jpg";
import sarahImage from "../assets/images/team/sarah.jpg";
import marcusImage from "../assets/images/team/marcus.jpg";
import davidImage from "../assets/images/team/david.jpg";

// Import team member images
// const alexImage = require("../assets/images/team/alex.jpg");
// const sarahImage = require("../assets/images/team/sarah.jpg");
// const marcusImage = require("../assets/images/team/marcus.jpg");
// const davidImage = require("../assets/images/team/david.jpg");
function LandingPage() {
	const features = [
		{
			name: "Web Security Testing",
			icon: FaShieldAlt,
			description: "Comprehensive web application vulnerability assessment",
		},
		{
			name: "API Testing",
			icon: FaCode,
			description: "Deep analysis of API endpoints and security",
		},
		{
			name: "Real-time Monitoring",
			icon: FaChartLine,
			description: "Continuous security monitoring and alerts",
		},
	];

	const teamMembers = [
		{
			name: "Safwan",
			// role: 'Lead Security Researcher',
			image: alexImage,
			icon: FaUserSecret,
			github: "https://github.com/safwan",
			email: "safwan@example.com",
		},
		{
			name: "Ashif",
			// role: 'Penetration Tester',
			image: sarahImage,
			icon: FaBug,
			github: "https://github.com/ashif",
			email: "ashif@example.com",
		},
		{
			name: "Ashirvad",
			// role: 'Security Architect',
			image: marcusImage,
			icon: FaLock,
			github: "https://github.com/ashirvad",
			email: "ashirvad@example.com",
		},
		{
			name: "Minhad",
			// role: 'Infrastructure Specialist',
			image: davidImage,
			icon: FaServer,
			github: "https://github.com/minhad",
			email: "minhad@example.com",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
			{/* Hero Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
				<div className="text-center relative">
					<h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6 leading-tight">
						Next-Generation
						<br />
						Security Testing
					</h1>
					<p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Our project automates penetration testing, specifically
						vulnerability scanning, using agentic AI to identify security
						weaknesses in systems, networks, or applications.
					</p>
					<div className="mt-10 flex justify-center space-x-4">
						<Link
							to="/input"
							className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium
                         hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-xl"
						>
							Launch Security Scan
						</Link>
						<Link
							to="/docs"
							className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white
                         px-8 py-3 rounded-full font-medium border border-gray-200 dark:border-gray-700
                         hover:bg-white dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-xl"
						>
							View Documentation
						</Link>
					</div>
				</div>

				{/* Features Grid */}
				<div className="mt-32">
					<h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-16">
						Key Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{features.map((feature) => (
							<div
								key={feature.name}
								className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8
                           border border-gray-200 dark:border-gray-700 shadow-lg
                           hover:shadow-xl transform hover:scale-105 transition-all duration-300"
							>
								<feature.icon
									className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-4
                                      transform transition-transform group-hover:scale-110"
								/>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
									{feature.name}
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Team Section */}
				<div className="mt-32">
					<h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-16">
						Meet Our Security Experts
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{teamMembers.map((member) => (
							<div
								key={member.name}
								className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center
                           border border-gray-200 dark:border-gray-700 shadow-lg
                           hover:shadow-xl transform hover:scale-105 transition-all duration-300"
							>
								<div className="flex flex-col items-center space-y-4">
									<div className="relative">
										<div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30" />
										<img
											src={member.image}
											alt={member.name}
											className="relative w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-gray-700"
										/>
										<div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-full shadow-lg">
											{React.createElement(member.icon, {
												className: "w-4 h-4",
											})}
										</div>
									</div>
									<div className="space-y-2">
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
											{member.name}
										</h3>
										<p className="text-gray-600 dark:text-gray-300">
											{member.role}
										</p>
									</div>
									<div className="flex items-center justify-center space-x-4 pt-2">
										<a
											href={member.github}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400
                               transition-all duration-300 transform hover:scale-110"
										>
											<FaGithub className="w-6 h-6" />
										</a>
										<a
											href={`mailto:${member.email}`}
											className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400
                               transition-all duration-300 transform hover:scale-110"
										>
											<FaEnvelope className="w-6 h-6" />
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* CTA Section */}
				<div className="mt-32 text-center relative overflow-hidden rounded-2xl">
					<div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90" />
					<div className="relative px-8 py-16">
						<h2 className="text-3xl font-bold text-white mb-4">
							Ready to Secure Your Infrastructure?
						</h2>
						<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
							Start your first security scan today and see the difference.
						</p>
						<Link
							to="/input"
							className="inline-block bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-3 rounded-full font-medium
                         hover:bg-white transform hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-xl"
						>
							Get Started
						</Link>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default LandingPage;
