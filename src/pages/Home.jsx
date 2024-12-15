import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivePostsSuccess } from "../store/postSlice"; // Redux action to store posts
import postManager from "../appwrite/postHandling"; // Service to fetch posts
import { Toast, Container, PostCard } from "../components/index";

function Home() {
	const [loading, setLoading] = useState(true);
	const [toastMessage, setToastMessage] = useState("");
	const [showToast, setShowToast] = useState(false);

	const dispatch = useDispatch();
	const posts = useSelector((state) => state.post.activePosts); // Access posts from Redux

	// Close the toast
	const handleCloseToast = () => {
		setShowToast(false);
		setToastMessage("");
	};

	useEffect(() => {
		async function fetchPosts() {
			try {
				// Check if posts already exist in Redux
				if (posts.length > 0) {
					console.log("Posts already exist in Redux");
					localStorage.setItem("activePosts", JSON.stringify(posts)); // Cache in localStorage
					setLoading(false);
					setToastMessage("Posts loaded successfully!");
					setShowToast(true);
					return;
				}

				// Try loading posts from localStorage
				const cachedPosts = localStorage.getItem("activePosts");
				if (cachedPosts && JSON.parse(cachedPosts).length > 0) {
					console.log("Posts found in localStorage In HOME");
					dispatch(fetchActivePostsSuccess({ posts: JSON.parse(cachedPosts) }));
					setLoading(false);
					return;
				}

				// Fetch from Appwrite if not in store or localStorage
				const response = await postManager.getActivePosts();
				if (response) {
					console.log("Posts fetched from Appwrite");
					const fetchedPosts = response.documents;
					dispatch(fetchActivePostsSuccess({ posts: fetchedPosts }));
					localStorage.setItem("activePosts", JSON.stringify(fetchedPosts)); // Cache in localStorage
					setToastMessage("Posts loaded successfully!");
					setShowToast(true);
				}
			} catch (error) {
				setToastMessage(`Error fetching posts: ${error.message}`);
				setShowToast(true);
			} finally {
				setLoading(false);
			}
		}

		fetchPosts();
	}, [posts]);

	return (
		<div className='w-full py-8 bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 text-gray-100'>
			{loading ? (
				<div className='w-full py-8 text-black-100 text-3xl text-center font-bold'>
					Loading.....
				</div>
			) : (
				<Container>
					<Toast
						message={toastMessage}
						show={showToast}
						onClose={handleCloseToast}
					/>
					<div className='py-6 px-4 bg-gray-800 rounded-lg shadow-lg text-gray-100'>
						<h1 className='text-2xl font-bold text-center mb-8'>
							Welcome to the Blog
						</h1>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
							{posts && posts.length > 0 ? (
								posts.map((post) => (
									<PostCard key={post.$id} imageId={post.imageId} {...post} />
								))
							) : (
								<div className='col-span-full text-center text-xl text-gray-500'>
									No posts available!
								</div>
							)}
						</div>
					</div>
				</Container>
			)}
		</div>
	);
}

export default Home;
