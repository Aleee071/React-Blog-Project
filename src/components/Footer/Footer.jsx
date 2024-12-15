import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
	return (
		<footer className='bg-gray-900 text-gray-400 py-12'>
			<div className='container mx-auto px-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
					{/* Logo and Copyright Section */}
					<div className='flex flex-col items-start'>
						<div className='mb-6'>
							<Logo width='80px' />
						</div>
						<p className='text-sm'>
							&copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
						</p>
					</div>

					{/* Links Section - Company */}
					<div>
						<h3 className='mb-4 text-sm font-semibold uppercase text-gray-500'>
							Company
						</h3>
						<ul className='space-y-3'>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Affiliate Program
								</Link>
							</li>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Press Kit
								</Link>
							</li>
						</ul>
					</div>

					{/* Links Section - Support */}
					<div>
						<h3 className='mb-4 text-sm font-semibold uppercase text-gray-500'>
							Support
						</h3>
						<ul className='space-y-3'>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Account
								</Link>
							</li>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Help
								</Link>
							</li>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Customer Support
								</Link>
							</li>
						</ul>
					</div>

					{/* Links Section - Legals */}
					<div>
						<h3 className='mb-4 text-sm font-semibold uppercase text-gray-500'>
							Legals
						</h3>
						<ul className='space-y-3'>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Terms &amp; Conditions
								</Link>
							</li>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									className='hover:text-white transition-colors duration-300'
									to='/'
								>
									Licensing
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
