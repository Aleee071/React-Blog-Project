import React, { useState } from "react";
import accountManager from "../../appwrite/accountHandling";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		setError("");
		try {
			const response = await accountManager.logout();
			if (response) {
				dispatch(logout());
				navigate("/login");
			}
		} catch (error) {
			console.error("Error during logout:", error);
			setError(error);
		}
	};

	return (
		<div>
			<button
				className='px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 active:from-red-600 active:to-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/20'
				onClick={logoutHandler}
			>
				Logout
			</button>
			{error && (
				<p className='text-red-400 mt-2 text-sm bg-red-500/10 px-3 py-1.5 rounded-lg'>
					{error.message}
				</p>
			)}
		</div>
	);
}

export default LogoutBtn;
