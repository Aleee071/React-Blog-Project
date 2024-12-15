import React, { useState, useEffect } from "react";
import postManager from "../appwrite/postHandling";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsSuccess } from "../store/postSlice";
import { Container, PostCard, Toast } from "../components";

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

					setLoading(false);
					setToastMessage("Posts loaded successfully!");
					setShowToast(true);
					return;
				}

				//Fetch posts from localStorage
				const cachedPosts = localStorage.getItem("allPosts");
				if (cachedPosts) {
					dispatch(fetchPostsSuccess({ posts: JSON.parse(cachedPosts) }));
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
		<div className='w-full py-8 bg-gradient-to-b from-gray-500 via-gray-100 to-gray-500 text-gray-100'>
			<Container>
				<div className='py-6 px-4 bg-gray-800 rounded-lg shadow-lg text-gray-100'>
					<h1 className='text-2xl font-bold text-center mb-8'>
						All Blogs <span className='text-blue-500 font-bold'>.</span>
					</h1>
					<Toast
						message={toastMessage}
						show={showToast}
						onClose={handleCloseToast}
					/>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{posts && posts.length > 0 ? (
							posts.map((post) => (
								<PostCard key={post.$id} imageId={post.imageId} {...post} />
							))
						) : (
							<h1 className='text-2xl font-bold text-center mb-8'>
								No posts available
							</h1>
						)}
					</div>
				</div>
			</Container>
		</div>
	) : (
		<div className='w-full py-8 bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 text-black-100 text-3xl text-center font-bold p-5'>
			Loading.....
		</div>
	);
}

export default AllPosts;
