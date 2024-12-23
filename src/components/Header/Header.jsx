import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { LogoutBtn } from "../index";

function Header() {
	const status = useSelector((state) => state.auth.status);
	const userData = useSelector((state) => state.auth.userData);

	const [userName, setUserName] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	useEffect(() => {
		if (userData) {
			setUserName(userData.name);
		}
	}, [userName, userData, status]);

	const navItems = [
		{ name: "Home", path: "/", active: true },
		{ name: "About", path: "/about", active: true },
		{ name: "Login", path: "/login", active: !status },
		{ name: "Signup", path: "/signup", active: !status },
		{ name: "All Posts", path: "/all-posts", active: true },
		{ name: "Add Post", path: "/add-post", active: status },
	];

	return (
		<header className='sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg'>
			<div className='w-full max-w-7xl mx-auto px-4'>
				<nav className='flex items-center justify-between py-3'>
					{/* Left Section: Logo */}
					<div className='flex items-center'>
						<Link
							to='/'
							className='text-white/90 font-bold text-xl relative group'
							onClick={closeMenu}
						>
							<h1 className='text-2xl tracking-wider transition-all duration-300 group-hover:text-white'>
								Logo
								<span className='text-blue-500 font-bold group-hover:text-blue-400 transition-colors duration-300'>
									.
								</span>
							</h1>
						</Link>
					</div>

					{/* Center Section: Navigation Links (Desktop) */}
					<div className='hidden md:flex flex-1 justify-center'>
						<ul className='flex items-center space-x-2'>
							{navItems.map(
								(item) =>
									item.active && (
										<li key={item.name} className='relative group'>
											<NavLink
												to={item.path}
												className={({ isActive }) => {
													const baseClasses =
														"px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 relative block";
													const activeClasses = isActive
														? "text-white bg-blue-500/10  shadow-lg"
														: "text-white/70 hover:text-white hover:bg-white/5";
													const underlineClasses = `after:content-[''] after:absolute after:left-4 after:right-4 after:-bottom-0.5 after:h-0.5 after:bg-blue-500 after:transition-transform after:duration-300 after:transform after:origin-left after:rounded-full after:${
														isActive
															? "scale-x-100"
															: "scale-x-0 group-hover:scale-x-100"
													}`;

													return `${baseClasses} ${activeClasses} ${underlineClasses}`;
												}}
											>
												{item.name}
											</NavLink>
										</li>
									)
							)}
						</ul>
					</div>

					{/* Right Section: User Info & Mobile Menu */}
					<div className='flex items-center md:space-x-4 space-x-2'>
						{/* User Info */}
						{status ? (
							<NavLink
								to={`/profile/${userData.$id}`}
								className={({ isActive }) => {
									return `flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 ${
										isActive
											? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-none ring-2 ring-blue-500/50"
											: "bg-slate-800/70 text-white border border-slate-700/90 hover:bg-slate-800/90"
									}`;
								}}
							>
								<svg
									className='w-4 h-4'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'></path>
								</svg>
								<span className='text-xs md:text-sm whitespace-nowrap leading-normal'>
									{userName}
								</span>
							</NavLink>
						) : (
							<div className=' text-xs md:text-md font-medium text-white bg-slate-800/90 px-4 py-2 rounded'>
								No user logged in
							</div>
						)}

						{/* Logout Button (Desktop) */}
						{status && (
							<div className='hidden md:block'>
								<LogoutBtn />
							</div>
						)}

						{/* Hamburger Menu Button (Mobile) */}
						<button
							className='md:hidden w-auto text-white/80 hover:text-blue-500 focus:outline-none transition-all duration-200 p-2 hover:bg-white/5 rounded-lg'
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
					</div>

					{/* Mobile Menu */}
					<div
						className={`${
							isMenuOpen ? "block" : "hidden"
						} md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 transition-all duration-300 transform`}
					>
						<ul className='p-4 space-y-2 h-screen backdrop-blur-md opacity-100 bg-gradient-to-br from-slate-800/90 to-slate-950/100'>
							{navItems.map(
								(item) =>
									item.active && (
										<li key={item.name} className='relative group'>
											<NavLink
												to={item.path}
												onClick={closeMenu}
												className={({ isActive }) => {
													const baseClasses =
														"px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 relative block";
													const activeClasses = isActive
														? "text-white bg-blue-500/20 shadow-lg"
														: "text-white/70 hover:text-white hover:bg-white/5";

													return `${baseClasses} ${activeClasses}`;
												}}
											>
												{item.name}
											</NavLink>
										</li>
									)
							)}
							{status && (
								<li className='pt-2 border-t border-slate-700/50'>
									<LogoutBtn onClick={closeMenu} />
								</li>
							)}
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
}

export default Header;
