import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import accountManager from "./appwrite/accountHandling";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	console.log("hey there");

	useEffect(() => {
		accountManager
			.getSession()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => console.error("Error during fetching session:", error))
			.finally(() => setLoading(false));
	}, []);
	return (
		!loading && (
			<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
				<div className='w-full block'>
					<Header />
					<Outlet />
					<Footer />
				</div>
			</div>
		)
	);
}

export default App;
