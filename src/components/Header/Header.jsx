import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Container, LogoutBtn } from "../index";

function Header() {
	const status = useSelector((state) => state.auth.status);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const navItems = [
		{ name: "Home", path: "/", active: true },
		{ name: "Login", path: "/login", active: !status },
		{ name: "Signup", path: "/signup", active: !status },
		{ name: "All Posts", path: "/all-posts", active: true },
		{ name: "Add Post", path: "/add-post", active: status },
	];

	return (
		<header className='bg-gray-900 py-4 shadow-md sticky top-0 z-50 border-b border-gray-700'>
			<Container>
				<nav className='flex items-center justify-between py-3'>
					{/* Logo Section */}
					<Link to='/' className='text-white font-bold text-xl'>
						{/* <Logo width='80px' /> */}
						<h1 className='text-2xl tracking-wider'>
							Logo
							<span className='text-blue-500 font-bold'>.</span>
						</h1>
					</Link>

					{/* Hamburger Menu Button (Mobile) */}
					<button
						className='lg:hidden text-white hover:text-blue-500 focus:outline-none justify-items-end'
						onClick={toggleMenu}
					>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							{isMenuOpen ? (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							) : (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							)}
						</svg>
					</button>

					{/* Navigation Links */}
					<ul
						className={`${
							isMenuOpen ? "block" : "hidden"
						} lg:flex flex-col lg:h-full lg:flex-row absolute lg:relative h-screen top-full left-0 right-0 bg-gray-900 lg:bg-transparent mt-0 lg:mt-0 p-4 lg:p-0 space-y-4 lg:space-y-0 lg:items-center lg:space-x-6 border-t border-gray-700 lg:border-none`}
					>
						{navItems.map(
							(item) =>
								item.active && (
									<li key={item.name} className='relative'>
										<NavLink
											to={item.path}
											className={({ isActive }) => {
												const baseClasses =
													"px-5 py-2 text-sm font-medium tracking-wide rounded transition-all duration-200 relative";
												const activeClasses = isActive
													? "text-white bg-gray-800 shadow-md"
													: "text-gray-300 hover:text-white hover:bg-gray-800";
												const underlineClasses = `after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-500 after:transition-transform after:duration-300 after:transform after:origin-left after:${
													isActive
														? "scale-x-70"
														: "scale-x-0 hover:scale-x-100"
												}`;

												return `${baseClasses} ${activeClasses} ${underlineClasses}`;
											}}
										>
											{item.name}
										</NavLink>
									</li>
								)
						)}

						{/* Logout Button (if authenticated) */}
						{status && (
							<li className='relative'>
								<LogoutBtn />
							</li>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
