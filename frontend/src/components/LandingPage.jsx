import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

import safvanImage from "../assets/images/team/safvan.png";
import ashifImage from "../assets/images/team/ashif.jpeg";
import ashirvadImage from "../assets/images/team/ashirvad.jpeg";

function LandingPage() {
	const teamMembers = [
		{
			name: "Mohammed Safvan",
			image: safvanImage,
			github: "https://github.com/mohammedsafvan",
		},
		{
			name: "Ashif P",
			image: ashifImage,
			github: "https://github.com/azhiif",
		},
		{
			name: "Ashirvad T B",
			image: ashirvadImage,
			github: "https://github.com/Ashirvadtb",
		},
		{
			name: "Minhad",
			// image: ashirvadImage,
			github: "https://github.com/manmuscle",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
			{/* Hero Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
				<div className="text-center relative">
					<h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6 leading-tight">
						Security Testing
						<br />
						Made Easy
					</h1>
					<p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Our project automates penetration testing, specifically
						vulnerability scanning, using agentic AI to identify security
						weaknesses in hosts.
					</p>
					<div className="mt-10 flex justify-center space-x-4">
						<Link
							to="/input"
							className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium
                         hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-xl"
						>
							Get Started
						</Link>
					</div>
				</div>

				{/* Team Section */}
				<div className="mt-11 m-auto">
					<h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-16">
						Team Members
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
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
