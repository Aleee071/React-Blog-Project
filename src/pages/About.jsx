import React, { useEffect, useState } from "react";
import { Toast } from "../components";

const About = () => {
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	const handleCloseToast = () => {
		setShowToast(false);
		setToastMessage("");
	};

	useEffect(() => {
		setToastMessage("Hey there!");
		setShowToast(true);
		setIsVisible(true);
	}, []);

	return (
		<div
			className={`min-h-screen w-full py-8 md:py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 transition-opacity duration-500 ${
				isVisible ? "opacity-100" : "opacity-20"
			}`}
		>
			<Toast
				message={toastMessage}
				show={showToast}
				onClose={handleCloseToast}
			/>
			<div className='max-w-4xl mx-auto px-4'>
				{/* Project Section */}
				<div className='bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 mb-8 transition-transform duration-300 transform hover:shadow-2xl'>
					<h1 className='text-3xl font-bold text-white/90 mb-6'>
						Blog React App
					</h1>
					<div className='space-y-4'>
						<div className='flex items-start space-x-3'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-6 h-6 text-blue-400 mt-1'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
								/>
							</svg>
							<div>
								<h2 className='text-xl font-semibold text-white/80'>
									Overview
								</h2>
								<p className='text-slate-400 mt-2'>
									A responsive and feature-rich blog application designed to
									provide a seamless user experience. Built using modern web
									technologies like React, Redux Toolkit, and Appwrite, it
									enables users to effortlessly create, view, edit, and delete
									blog posts. The intuitive interface ensures smooth navigation,
									while robust functionality ensures reliability for content
									management. Perfectly tailored for dynamic and real-time
									blogging needs.
								</p>
							</div>
						</div>

						<div className='flex items-start space-x-3'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-6 h-6 text-blue-400 mt-1'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
								/>
							</svg>
							<div>
								<h2 className='text-xl font-semibold text-white/80'>
									Tech Stack
								</h2>
								<div className='mt-2 flex flex-wrap gap-2'>
									<span className='px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm hover:bg-blue-800/50 transition duration-200'>
										React
									</span>
									<span className='px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm hover:bg-purple-800/50 transition duration-200'>
										Redux Toolkit
									</span>
									<span className='px-3 py-1 bg-pink-900/50 text-pink-300 rounded-full text-sm hover:bg-pink-800/50 transition duration-200'>
										Appwrite
									</span>
									<span className='px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm hover:bg-green-800/50 transition duration-200'>
										Tailwind CSS
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Personal Section */}
				<div className='bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 transition-transform duration-300 transform hover:shadow-2xl'>
					<div className='flex space-x-4 mb-6'>
						<div className='bg-gradient-to-r from-blue-600 to-blue-400 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center'>
							<span className='text-lg md:text-xl lg:text-2xl text-white font-bold'>
								MS
							</span>
						</div>

						<div>
							<h2 className='text-2xl font-bold text-white/90'>
								Muhammad Ali Shaikh
							</h2>
							<p className='text-slate-400'>
								Computer Science Student & Web Developer
							</p>
						</div>
					</div>

					<div className='space-y-4'>
						<div className='flex items-start space-x-3'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-6 h-6 text-blue-400 mt-1'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
								/>
							</svg>
							<div>
								<h3 className='text-xl font-semibold text-white/80'>
									Education
								</h3>
								<p className='text-slate-400 mt-2'>
									Currently pursuing Bachelor's degree in Computer Science
								</p>
							</div>
						</div>

						<div className='flex items-start space-x-3'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-6 h-6 text-blue-400 mt-1'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
								/>
							</svg>
							<div>
								<h3 className='text-xl font-semibold text-white/80'>Skills</h3>
								<div className='mt-2 flex flex-wrap gap-2'>
									<span className='px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-sm hover:bg-slate-700/50 transition duration-200'>
										HTML
									</span>
									<span className='px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-sm hover:bg-slate-700/50 transition duration-200'>
										CSS
									</span>
									<span className='px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-sm hover:bg-slate-700/50 transition duration-200'>
										JavaScript
									</span>
									<span className='px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-sm hover:bg-slate-700/50 transition duration-200'>
										React
									</span>
								</div>
							</div>
						</div>

						{/* LinkedIn Link */}
						<div className='flex items-start space-x-3'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-5 h-5 text-blue-400 mt-1'
								fill='currentColor'
								viewBox='0 0 448 512'
							>
								<path d='M100.28 448H7.4V149.9h92.88zm-46.44-340c-30.67 0-55.56-24.89-55.56-55.56S23.17 0 53.84 0s55.56 24.89 55.56 55.56-24.89 55.56-55.56 55.56zM447.9 448h-92.68V305.4c0-34-12.16-57.26-42.6-57.26-23.21 0-37.04 15.61-43.14 30.67-2.22 5.39-2.77 12.87-2.77 20.4V448H174.1V149.9h89v40.8c11.81-18.18 33.04-44.11 80.38-44.11 58.67 0 102.42 38.27 102.42 120.51V448z' />
							</svg>
							<div>
								<h3 className='text-xl font-semibold text-white/80'>
									LinkedIn
								</h3>
								<p className='text-slate-400 mt-2'>
									<a
										href='https://www.linkedin.com/in/muhammad-ali-4853b2260/'
										className='text-blue-400 hover:underline'
										target='_blank'
										rel='noopener noreferrer'
									>
										Visit my LinkedIn profile
									</a>
								</p>
							</div>
						</div>

						{/* GitHub Link */}
						<div className='flex items-start space-x-3'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-6 h-6 text-gray-400 mt-1'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M12 0.5c-6.63 0-12 5.37-12 12 0 5.3 3.43 9.79 8.21 11.39 0.6 0.11 0.82-0.26 0.82-0.58v-2.25c-3.34 0.72-4.04-1.61-4.04-1.61-0.55-1.41-1.34-1.78-1.34-1.78-1.09-0.74 0.08-0.73 0.08-0.73 1.21 0.09 1.85 1.25 1.85 1.25 1.07 1.84 2.82 1.31 3.51 1 0.11-0.78 0.42-1.31 0.76-1.61-2.67-0.3-5.47-1.34-5.47-5.97 0-1.32 0.47-2.4 1.25-3.25-0.13-0.31-0.54-1.56 0.12-3.25 0 0 1.01-0.32 3.3 1.24 0.96-0.27 1.99-0.4 3.01-0.4s2.05 0.14 3.01 0.4c2.29-1.56 3.3-1.24 3.3-1.24 0.66 1.69 0.25 2.94 0.12 3.25 0.78 0.85 1.25 1.93 1.25 3.25 0 4.64-2.81 5.67-5.48 5.97 0.43 0.37 0.82 1.1 0.82 2.22v3.29c0 0.32 0.22 0.69 0.82 0.58 4.78-1.61 8.21-6.1 8.21-11.39 0-6.63-5.37-12-12-12z' />
							</svg>
							<div>
								<h3 className='text-xl font-semibold text-white/80'>GitHub</h3>
								<p className='text-slate-400 mt-2'>
									<a
										href='https://github.com/Aleee071'
										className='text-gray-300 hover:underline'
										target='_blank'
										rel='noopener noreferrer'
									>
										View my GitHub repositories
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
