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
				navigate("/");
			}
		} catch (error) {
			console.error("Error during logout:", error);
			setError(error);
		}
	};

	return (
		<div>
			<button
				className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all duration-300 shadow-sm'
				onClick={logoutHandler}
			>
				Logout
			</button>
			{error && <p className='text-red-500 mt-2'>{error.message}</p>}
		</div>
	);
}

export default LogoutBtn;
