import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import parse from "html-react-parser";
import { Button, Container, Toast } from "../components";
import fileManager from "../appwrite/fileHandling";
import postManager from "../appwrite/postHandling";
import { deletePostSuccess } from "../store/postSlice";

function Post() {
	const [post, setPost] = useState(null);
	const [toastMessage, setToastMessage] = useState("");
	const [showToast, setShowToast] = useState(false);
	const [loading, setLoading] = useState(true);

	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userData = useSelector((state) => state.auth.userData);
	const isAuthor = post && userData ? post.userId === userData.$id : false;

	useEffect(() => {
		postManager.getPost(id).then((post) => {
			if (post) {
				setPost(post);
				setLoading(false);
			} else {
				navigate("/");
			}
		});
	}, [id, navigate]);

	const handleToastClose = () => {
		setShowToast(false);
		setToastMessage("");
	};

	function deletePost() {
		if (window.confirm("Are you sure you want to delete this post?"))
			postManager
				.deletePost(post.$id)
				.then(() => {
					dispatch(deletePostSuccess({ postId: post.$id }));
					return fileManager.deleteFile(post.imageId);
				})
				.then(() => {
					setToastMessage("Post deleted successfully!");
					setShowToast(true);
					setTimeout(() => navigate("/"), 2000); // Navigate after showing the toast
				})
				.catch((error) => {
					console.error("Error deleting post or file:", error);
					setToastMessage("Failed to delete post. Please try again.");
					setShowToast(true);
				});
	}

	return !loading ? (
		<div className='py-8'>
			<Toast
				message={toastMessage}
				show={showToast}
				onClose={handleToastClose}
			/>
			<Container>
				<div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
					<img
						src={fileManager.getFilePreview(post.imageId)}
						alt={post.title}
						className='rounded-xl'
					/>

					{isAuthor && (
						<div className='absolute right-6 top-6'>
							<Link to={`/edit-post/${post.$id}`}>
								<Button className='mr-3 font-semibold mb-3 bg-green-500'>
									Edit
								</Button>
							</Link>
							<Button className='bg-red-500 font-semibold' onClick={deletePost}>
								Delete
							</Button>
						</div>
					)}
				</div>
				<div className='w-full mb-6'>
					<h1 className='text-2xl font-bold'>{post.title}</h1>
				</div>
				<div className='browser-css'>{parse(post.content)}</div>
			</Container>
		</div>
	) : (
		<div className='w-full py-8 bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 text-black-100 text-3xl text-center font-bold p-5'>
			Loading.....
		</div>
	);
}

export default Post;
