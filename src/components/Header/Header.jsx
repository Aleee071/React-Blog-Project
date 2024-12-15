import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn, Logo } from "../index";

function Header() {
	const status = useSelector((state) => state.auth.status);
	// const navigate = useNavigate();

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

					{/* Navigation Links */}
					<ul className='flex items-center space-x-6'>
						{navItems.map(
							(item) =>
								item.active && (
									<li key={item.name} className='relative'>
										<NavLink
											to={item.path}
											className={({ isActive }) =>
												`px-5 py-2 text-sm font-medium tracking-wide rounded transition-all duration-200 ${
													isActive
														? "text-white bg-gray-800 shadow-md"
														: "text-gray-300 hover:text-white hover:bg-gray-800"
												}`
											}
										>
											{item.name}
											<span
												className={`absolute left-0 -bottom-0.5 w-full h-[2px] bg-blue-500 transition-transform duration-300 transform mt-3 origin-left ${({
													isActive,
												}) =>
													isActive
														? "scale-x-70"
														: "scale-x-0 hover:scale-x-100"}`}
											></span>
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
