import React, { useState, useEffect } from "react";
import postManager from "../appwrite/postHandling";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsSuccess } from "../store/postSlice";
import { PostCard, Toast } from "../components";

function AllPosts() {
	const [loading, setLoading] = useState(true);
	const [toastMessage, setToastMessage] = useState("");
	const [showToast, setShowToast] = useState(false);

	const posts = useSelector((state) => state.post.posts);
	const dispatch = useDispatch();

	const handleCloseToast = () => {
		setShowToast(false);
		setToastMessage("");
	};

	useEffect(() => {
		async function fetchPosts() {
			try {
				if (posts.length > 0) {
					localStorage.setItem("allPosts", JSON.stringify(posts));

					console.log("posts fetched from store");

					setLoading(false);
					setToastMessage("Posts loaded successfully!");
					setShowToast(true);
					return;
				}

				//Fetch posts from localStorage
				const cachedPosts = localStorage.getItem("allPosts");
				if (cachedPosts) {
					dispatch(fetchPostsSuccess({ posts: JSON.parse(cachedPosts) }));

					console.log("posts fetched from local storage");

					setLoading(false);
					setToastMessage("Posts loaded successfully!");
					setShowToast(true);
					return;
				}

				//Fetch posts from Appwrite
				const response = await postManager.getAllPosts();
				if (response) {
					const fetchedPosts = response.documents;
					dispatch(fetchPostsSuccess({ posts: fetchedPosts }));
					localStorage.setItem("allPosts", JSON.stringify(fetchedPosts));

					console.log("posts fetched from Appwrite");

					setLoading(false);
					setToastMessage("Posts loaded successfully!");
					setShowToast(true);
				}
			} catch (error) {
				setToastMessage(`Error fetching posts: ${error.message}`);
				setShowToast(true);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		}

		fetchPosts();
	}, []);

	return !loading ? (
		<div className='w-full min-h-screen py-8 md:py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950'>
			<div className='w-full max-w-7xl mx-auto px-4'>
				<Toast
					message={toastMessage}
					show={showToast}
					onClose={handleCloseToast}
				/>
				<div className='p-6 md:p-8 bg-slate-900/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-800/50'>
					<h1 className='text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-white via-blue-100 to-blue-200 text-transparent bg-clip-text'>
						All Blogs
						<span className='inline-block ml-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse'></span>
					</h1>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr'>
						{posts && posts.length > 0 ? (
							posts.map((post) => (
								<div key={post.$id} className='h-full'>
									<PostCard imageId={post.imageId} {...post} />
								</div>
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
		</div>
	) : (
		<div className='w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950'>
			<div className='flex items-center justify-center min-h-screen'>
				<div className='animate-pulse text-white/80 text-3xl md:text-4xl font-bold tracking-wider flex items-center gap-1'>
					Loading
					<div className='flex gap-1'>
						<span className='animate-bounce inline-block w-2 h-2 bg-blue-500 rounded-full'></span>
						<span className='animate-bounce delay-100 inline-block w-2 h-2 bg-blue-400 rounded-full'></span>
						<span className='animate-bounce delay-200 inline-block w-2 h-2 bg-blue-300 rounded-full'></span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AllPosts;
