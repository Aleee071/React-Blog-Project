import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivePostsSuccess } from "../store/postSlice"; // Redux action to store posts
import postManager from "../appwrite/postHandling"; // Service to fetch posts
import { Toast, PostCard } from "../components/index";

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
					localStorage.setItem("activePosts", JSON.stringify(posts)); // Cache in localStorage
					setLoading(false);
					setToastMessage("Posts loaded successfully!");
					setShowToast(true);
					return;
				}

				// Try loading posts from localStorage
				const cachedPosts = localStorage.getItem("activePosts");
				if (cachedPosts && JSON.parse(cachedPosts).length > 0) {
					dispatch(fetchActivePostsSuccess({ posts: JSON.parse(cachedPosts) }));
					setLoading(false);
					return;
				}

				// Fetch from Appwrite if not in store or localStorage
				const response = await postManager.getActivePosts();
				if (response) {
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
		<div className='min-h-screen w-full py-8 md:py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950'>
			{loading ? (
				<div className='flex items-center justify-center min-h-[60vh]'>
					<div className='animate-pulse text-white/80 text-3xl md:text-4xl font-bold tracking-wider flex items-center gap-1'>
						Loading
						<div className='flex gap-1'>
							<span className='animate-bounce inline-block w-2 h-2 bg-blue-500 rounded-full'></span>
							<span className='animate-bounce delay-100 inline-block w-2 h-2 bg-blue-400 rounded-full'></span>
							<span className='animate-bounce delay-200 inline-block w-2 h-2 bg-blue-300 rounded-full'></span>
						</div>
					</div>
				</div>
			) : (
				<div className='w-full max-w-7xl mx-auto px-4'>
					<div className='flex flex-wrap md:flex-nowrap gap-4 md:gap-8'>
						{/* Left Section - Featured Posts */}
						<div className='w-full md:w-2/3'>
							<h2 className='text-2xl font-bold mb-6 text-white/90'>
								Featured Posts
							</h2>
							<div className='grid gap-6'>
								{posts && posts.length > 0 ? (
									posts.map((post) => (
										<PostCard key={post.$id} imageId={post.imageId} {...post} />
									))
								) : (
									<div className='col-span-full flex flex-col items-center justify-center min-h-[200px] text-xl md:text-2xl text-slate-400 font-light'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-16 w-16 text-slate-500 mb-4 opacity-50'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={1.5}
												d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
											/>
										</svg>
										No posts available yet!
									</div>
								)}
							</div>
						</div>

						{/* Right Section - Recent Posts */}
						<div className='w-full md:w-1/3'>
							<h2 className='text-2xl font-bold mb-6 text-white/90'>
								Recent Posts
							</h2>
							<div className='grid gap-6'>
								{posts && posts.length > 0 ? (
									posts.map((post) => (
										<PostCard key={post.$id} imageId={post.imageId} {...post} />
									))
								) : (
									<div className='col-span-full flex flex-col items-center justify-center min-h-[200px] text-xl md:text-2xl text-slate-400 font-light'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-16 w-16 text-slate-500 mb-4 opacity-50'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={1.5}
												d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
											/>
										</svg>
										No posts available yet!
									</div>
								)}
							</div>
						</div>
					</div>
					<Toast
						message={toastMessage}
						show={showToast}
						onClose={handleCloseToast}
					/>
				</div>
			)}
		</div>
	);
}

export default Home;
