import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import postManager from "../appwrite/postHandling";
import { Toast, PostCard } from "../components/index";
import { useParams } from "react-router-dom";

function Profile() {
	const userData = useSelector((state) => state.auth.userData);

	const [posts, setPosts] = useState([]);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, showToastMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [postUser, setPostUser] = useState({});
	const { id } = useParams();

	const isOwnProfile = userData?.$id === id;

	const handleCloseToast = () => {
		setShowToast(false);
		showToastMessage("");
	};

	useEffect(() => {
		const loadPosts = async () => {
			if (!userData) {
				setIsLoading(false);
				return;
			}

			try {
				const posts = await postManager.getPostsByUserId(id);

				if (posts?.documents.length === 0) {
					setPostUser({
						userName: userData.name,
						email: userData.email,
					});
				} else {
					setPostUser({
						userName: posts?.documents[0]?.userName,
						email: posts?.documents[1]?.userEmail,
					});
				}

				if (posts?.documents.length > 0) {
					setPosts(posts.documents);
					showToastMessage("Posts loaded successfully!", "success");
					setShowToast(true);
				} else {
					setPosts([]);
					showToastMessage("No posts found.", "error");
					setShowToast(true);
				}
			} catch (error) {
				console.error("Appwrite service :: getPostsByUserId :: error: ", error);
				showToastMessage("Failed to load posts. Please try again.", "error");
				setShowToast(true);
				setPosts([]);
			}

			setIsLoading(false);
		};
		loadPosts();
	}, [id]);

	if (!userData) {
		return (
			<div className='min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900'>
				<h2 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
					Please log in to view your profile
				</h2>
			</div>
		);
	}

	return (
		<div className='w-full min-h-screen bg-gray-900'>
			<div className='max-w-7xl mx-auto space-y-6 p-4'>
				<div className='bg-gray-800 rounded-lg shadow-lg p-6'>
					{isOwnProfile ? (
						<h1 className='text-3xl font-bold text-white mb-2'>
							Welcome, {postUser.userName}
						</h1>
					) : (
						<h1 className='text-3xl font-bold text-white mb-2'>
							Profile: {postUser.userName}
						</h1>
					)}

					<p className='text-gray-300 mb-4'>{postUser.email}</p>
				</div>

				<Toast
					message={toastMessage}
					show={showToast}
					onClose={handleCloseToast}
				/>

				<div className='bg-gray-800 rounded-lg shadow-lg p-6'>
					{isOwnProfile ? (
						<h2 className='text-2xl font-semibold text-white mb-6'>
							Your Posts<span className='text-blue-400'>.</span>
						</h2>
					) : (
						<h2 className='text-2xl font-semibold text-white mb-6'>
							Their Posts<span className='text-blue-400'>.</span>
						</h2>
					)}

					{isLoading ? (
						<div className='flex items-center justify-center py-8'>
							<div className='animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent'></div>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{posts.length > 0 ? (
								posts.map((post) => (
									<div
										key={post.$id}
										className='relative overflow-hidden rounded-lg transition-shadow duration-300'
									>
										<PostCard {...post} />
									</div>
								))
							) : (
								<p className='col-span-full text-center text-gray-400 py-8'>
									You haven't created any posts yet.
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
