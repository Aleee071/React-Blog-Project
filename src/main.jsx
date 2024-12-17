import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import Protected from "./components/AuthLayout.jsx";
import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import EditPost from "./pages/EditPost.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route path='/' element={<Home />} />
			<Route
				path='/login'
				element={
					<Protected authentication={false}>
						<Login />
					</Protected>
				}
			/>
			<Route
				path='/add-post'
				element={
					<Protected authentication>
						<AddPost />
					</Protected>
				}
			/>
			<Route
				path='/signup'
				element={
					<Protected authentication={false}>
						<Signup />
					</Protected>
				}
			/>
			<Route
				path='/all-posts'
				element={
					<Protected authentication>
						<AllPosts />
					</Protected>
				}
			/>
			<Route
				path='/post/:id'
				element={
					<Protected authentication>
						<Post />
					</Protected>
				}
			/>
			<Route
				path='/edit-post/:id'
				element={
					<Protected authentication>
						<EditPost />
					</Protected>
				}
			/>
			<Route
				path='/profile/:id'
				element={
					<Protected authentication>
						<Profile />
					</Protected>
				}
			/>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
