import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import parse from "html-react-parser";
import { Button, Toast, Input } from "../components";
import fileManager from "../appwrite/fileHandling";
import postManager from "../appwrite/postHandling";
import { deletePostSuccess } from "../store/postSlice";
import { useForm } from "react-hook-form";
import commentManager from "../appwrite/commentsHandling";

function Post() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { isSubmitting },
	} = useForm();

	const [post, setPost] = useState(null);
	const [toastMessage, setToastMessage] = useState("");
	const [showToast, setShowToast] = useState(false);
	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [isEditMode, setIsEditMode] = useState(false);
	const [editId, setEditId] = useState(null);
	const [editedComment, setEditedComment] = useState("");
	const [userName, setUserName] = useState("");

	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const status = useSelector((state) => state.auth.status);
	const userData = useSelector((state) => state.auth.userData);
	const isAuthor = post && userData ? post.userId === userData.$id : false;
	const isCommenter = (commentUserId) => {
		return userData ? commentUserId === userData.$id : false;
	};

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

	useEffect(() => {
		if (post) {
			setUserName(post.userName);
		}
		try {
			commentManager.getComments(id).then((comments) => {
				if (comments && comments.documents.length > 0) {
					setComments(comments.documents);
					setToastMessage("Comments loaded successfully!");
					setShowToast(true);
				} else {
					setToastMessage("There are no comments available for this post.");
					setShowToast(true);
				}
			});
		} catch (error) {
			console.error("Error fetching comments:", error);
			setToastMessage("Failed to fetch comments. Please try again.");
			setShowToast(true);
		}
	}, [post, id]);

	const handleToastClose = () => {
		setShowToast(false);
		setToastMessage("");
	};

	function getCurrentDate() {
		const options = {
			weekday: "short", // Short day name, e.g., "Sun"
			month: "short", // Short month name, e.g., "Dec"
			day: "numeric", // Day of the month, e.g., 15
			hour: "numeric", // Hour in 12-hour format
			minute: "2-digit", // Minute with leading zero
			hour12: true, // Use 12-hour clock with AM/PM
		};

		const currentDate = new Date();
		return currentDate.toLocaleString("en-US", options);
	}

	async function handleCommentSubmit(data) {
		try {
			const newComment = await commentManager.createComment({
				postId: post?.$id,
				content: data.comment,
				userId: userData?.$id,
				userName: userData?.name,
				createdAt: getCurrentDate(),
			});
			setValue("comment", ""); // Clear the comment field

			// Update comments state with the new comment
			setComments((prevComments) => [...prevComments, newComment]);
			setToastMessage("Comment posted successfully!");
			setShowToast(true);
		} catch (error) {
			console.error("Error posting comment:", error);
			setToastMessage("Failed to post comment. Please try again.");
			setShowToast(true);
		}
	}

	async function deleteComment(commentId) {
		const response = await commentManager.deleteComment(commentId);

		if (response) {
			setComments((prevComments) =>
				prevComments.filter((comment) => comment.$id !== commentId)
			);
			setToastMessage("Comment deleted successfully!");
			setShowToast(true);
		} else {
			setToastMessage("Failed to delete comment. Please try again.");
			setShowToast(true);
		}
	}

	async function handleEditComment(commentId) {
		setIsEditMode(true);
		setEditId(commentId);
		const comment = comments.find((comment) => comment.$id === commentId);
		setEditedComment(comment.content);
	}

	async function handleSaveEdit(commentId) {
		try {
			if (editedComment.length > 0) {
				const response = await commentManager.updateComment(commentId, {
					content: editedComment,
				});

				if (response) {
					setComments((prevComments) =>
						prevComments.map((comment) =>
							comment.$id === commentId
								? { ...comment, content: editedComment }
								: comment
						)
					);

					setToastMessage("Comment updated successfully!");
					setShowToast(true);
					setIsEditMode(false);
					setEditId(null);
				} else {
					setToastMessage("Failed to update comment. Please try again.");
					setShowToast(true);
				}
			} else {
				setToastMessage("Comment content cannot be empty.");
				setShowToast(true);
			}
		} catch (error) {
			console.error("Error updating comment:", error);
			setToastMessage("Failed to update comment. Please try again.");
			setShowToast(true);
		}
	}

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
		<div className='py-8 min-h-screen bg-gradient-to-b from-gray-900 to-black'>
			<Toast
				message={toastMessage}
				show={showToast}
				onClose={handleToastClose}
			/>
			<div className='w-full max-w-7xl mx-auto px-4'>
				<div className='p-6 md:p-8 bg-slate-900/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-800/50'>
					<div className='max-w-4xl mx-auto'>
						<div className='w-full flex justify-center mb-8 relative overflow-hidden rounded-xl bg-black/40 p-4 backdrop-blur-sm border border-white/10'>
							<img
								src={fileManager.getFilePreview(post.imageId)}
								alt={post.title}
								className='rounded-xl max-h-[600px] object-cover shadow-2xl'
							/>

							{isAuthor && (
								<div className='absolute right-6 top-6 space-x-3'>
									<Link to={`/edit-post/${post.$id}`}>
										<Button className='font-medium px-6 py-2 bg-green-500 hover:bg-green-600 transition-colors duration-200 shadow-lg'>
											Edit
										</Button>
									</Link>
									<Button
										className='bg-red-500 hover:bg-red-600 transition-colors duration-200 font-medium px-6 py-2 shadow-lg'
										onClick={deletePost}
									>
										Delete
									</Button>
								</div>
							)}
						</div>
						<div className='w-full flex justify-between mb-6'>
							<h1 className='text-3xl font-bold uppercase tracking-wide text-white/90 pb-2 border-b-2 border-blue-500/30'>
								{post.title}
							</h1>
							<div>
								{status ? (
									<NavLink
										to={`/profile/${post?.userId}`}
										className={({ isActive }) => {
											return `flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 ${
												isActive
													? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-none ring-2 ring-blue-500/50"
													: "bg-slate-800/70 text-white border border-slate-700/90 hover:bg-slate-800/90"
											}`;
										}}
									>
										<svg
											className='w-4 h-4'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'></path>
										</svg>
										<span className='text-xs md:text-sm whitespace-nowrap leading-normal'>
											{userName}
										</span>
									</NavLink>
								) : (
									<div className=' text-xs md:text-md font-medium text-white bg-slate-800/90 px-4 py-2 rounded'>
										No user logged in
									</div>
								)}
							</div>
						</div>
						<div className='browser-css tracking-normal text-base text-white/80 leading-relaxed'>
							{parse(post.content)}
						</div>
						<div className='bg-black/40 backdrop-blur-sm mt-8 rounded-xl shadow-lg p-6 border-2 transition-all duration-300 border-blue-500/30'>
							<form onSubmit={handleSubmit(handleCommentSubmit)}>
								<Input
									label='Comment'
									className='w-full mb-4 border-white/20 focus:border-blue-500/50'
									placeholder='Share your thoughts...'
									{...register("comment", { required: true })}
								/>
								<Button
									type='submit'
									disabled={isSubmitting}
									className='bg-blue-500 hover:bg-blue-600 mt-4 text-white px-8 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/20'
								>
									{isSubmitting ? "Posting..." : "Post Comment"}
								</Button>
							</form>
						</div>
						<div className='space-y-6'>
							<h1 className='text-2xl mt-8 text-white font-bold flex items-center gap-3'>
								Comments section
								<span className='inline-flex items-center justify-center bg-blue-500 text-white text-sm rounded-full h-7 w-7 shadow-lg'>
									{comments.length}
								</span>
							</h1>
							{comments.length > 0 ? (
								<ul className='space-y-4'>
									{comments.map((comment) => (
										<li
											key={comment.$id}
											className='bg-black/40 backdrop-blur-sm p-5 rounded-xl shadow-lg border-2 border-blue-500/40 transition-all duration-300'
										>
											<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
												<div className='space-y-2'>
													{isEditMode && comment.$id === editId ? (
														<div>
															<Input
																defaultValue={editedComment}
																onChange={(e) =>
																	setEditedComment(e.target.value)
																}
															/>
															<div className='flex gap-3 mt-3'>
																<button
																	onClick={() => handleSaveEdit(comment.$id)}
																	className='px-4 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-200 border border-green-500/20'
																>
																	<svg
																		xmlns='http://www.w3.org/2000/svg'
																		className='h-4 w-4'
																		viewBox='0 0 20 20'
																		fill='currentColor'
																	>
																		<path
																			fillRule='evenodd'
																			d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
																			clipRule='evenodd'
																		/>
																	</svg>
																	Save
																</button>
																<button
																	onClick={() => {
																		setIsEditMode(false);
																		setEditId(null);
																	}}
																	className='px-4 py-1.5 bg-slate-600/20 hover:bg-slate-600/30 text-slate-300 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-200 border border-slate-600/20'
																>
																	<svg
																		xmlns='http://www.w3.org/2000/svg'
																		className='h-4 w-4'
																		viewBox='0 0 20 20'
																		fill='currentColor'
																	>
																		<path
																			fillRule='evenodd'
																			d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
																			clipRule='evenodd'
																		/>
																	</svg>
																	Cancel
																</button>
															</div>
														</div>
													) : (
														<p className='text-white/90 text-base leading-relaxed'>
															{comment.content}
														</p>
													)}

													<span className='text-blue-400 text-sm font-medium flex items-center gap-2'>
														<span className='w-1.5 h-1.5 rounded-full bg-blue-400'></span>
														by{" "}
														{comment.userId === userData?.$id
															? "You"
															: comment.userName}
													</span>
												</div>
												<div className='flex items-center'>
													<span className='text-white/60 text-sm whitespace-nowrap'>
														{comment.createdAt}
													</span>
													{isCommenter(comment.userId) && (
														<div className='flex ml-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-1.5 gap-2 shadow-lg'>
															<button
																className='p-1.5 hover:bg-blue-500/20 rounded-md transition-all duration-200 group'
																title='Edit comment'
																onClick={() => handleEditComment(comment.$id)}
															>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	className='h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-200'
																	viewBox='0 0 20 20'
																	fill='currentColor'
																>
																	<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
																</svg>
															</button>
															<button
																className='p-1.5 hover:bg-red-500/20 rounded-md transition-all duration-200 group'
																title='Delete comment'
																onClick={() => deleteComment(comment.$id)}
															>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	className='h-4 w-4 text-red-400 group-hover:text-red-300 transition-colors duration-200'
																	viewBox='0 0 20 20'
																	fill='currentColor'
																>
																	<path
																		fillRule='evenodd'
																		d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
																		clipRule='evenodd'
																	/>
																</svg>
															</button>
														</div>
													)}
												</div>
											</div>
										</li>
									))}
								</ul>
							) : (
								<p className='text-red-400 bg-red-500/10 backdrop-blur-sm border border-red-500/20 p-6 rounded-xl text-center shadow-lg'>
									There are no comments available for this post.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className='w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black'>
			<div className='text-white/90 text-2xl font-bold flex flex-col items-center gap-4'>
				<div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
				Loading...
			</div>
		</div>
	);
}

export default Post;
