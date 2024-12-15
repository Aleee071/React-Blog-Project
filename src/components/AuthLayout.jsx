import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true); // Clearer naming
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		// Redirect based on authentication status
		if (authStatus !== authentication) {
			navigate(authentication ? "/login" : "/");
		} else {
			setIsLoading(false); // Set loading to false only when check passes
		}
	}, [authStatus, authentication, navigate]);

	if (isLoading) {
		return <h1>Loading...</h1>; // Show loader while checking authentication
	}

	return <>{children}</>; // Render children when authentication check passes
}

export default Protected;
