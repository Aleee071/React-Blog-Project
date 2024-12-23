import React, { useCallback, useState, useEffect } from "react";
import { Button, Input, Select, RTE, Toast } from "./index";
import fileManager from "../appwrite/fileHandling";
import postManager from "../appwrite/postHandling";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	updatePostSuccess,
	updateActivePostSuccess,
	createPostSuccess,
	createActivePostSuccess,
} from "../store/postSlice";

function PostForm({ post }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.userData);

	const [toastMessage, setToastMessage] = useState("");
	const [showToast, setShowToast] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: post?.title || "",
			content: post?.content || "",
			slug: post?.slug || "",
			status: post?.status || "active",
		},
	});

	const handleCloseToast = () => {
		setShowToast(false);
		setToastMessage("");
	};

	const submit = async (data) => {
		setToastMessage("Started uploading. Please wait....");
		setShowToast(true);
		try {
			let file;
			if (data.image[0]) {
				file = await fileManager.uploadFile(data.image[0]);
				if (file) {
					if (post?.imageId) {
						await fileManager.deleteFile(post.imageId);
					}
				}
			}

			const updatedPostData = {
				...data,
				imageId: file ? file.$id : post?.imageId,
				userId: userData.$id,
				userName: userData.name,
				userEmail: userData.email,
			};

			let dbPost;
			if (post) {
				try {
					dbPost = await postManager.updatePost(post.$id, updatedPostData);
					if (dbPost) {
						if (dbPost.status === "active") {
							dispatch(updateActivePostSuccess({ post: dbPost }));
						} else {
							dispatch(updatePostSuccess({ post: dbPost }));
						}

						setToastMessage("Post updated successfully!");
						setShowToast(true);
						console.log("Toast updated: ", toastMessage, showToast);
						setTimeout(() => navigate(`/post/${dbPost.$id}`), 2000); // Navigate after showing the toast
					}
				} catch (error) {
					throw new Error(error);
				}
			} else {
				dbPost = await postManager.createPost(updatedPostData);

				if (dbPost) {
					if (dbPost.status === "active") {
						dispatch(createActivePostSuccess({ post: dbPost }));
					} else {
						dispatch(createPostSuccess({ post: dbPost }));
					}

					//continue from here

					setToastMessage("Post created successfully!");
					setShowToast(true);
					console.log("Toast updated: ", toastMessage, showToast);
					setTimeout(() => navigate(`/post/${dbPost.$id}`), 2000); // Navigate after showing the toast
				}
			}
		} catch (error) {
			console.error(error);
			setToastMessage(error);
			setShowToast(true);
		}
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return value.toLowerCase().replace(/\s+/g, "-");
		return "";
	}, []);

	useEffect(() => {
		if (post) {
			setValue("title", post.title);
			setValue("content", post.content);
			setValue("slug", slugTransform(getValues("title")));
			setValue("status", post.status);
		}
	}, [post, setValue]);

	useEffect(() => {
		const subscription = watch(({ title }, { name }) => {
			if (name === "title" && title) {
				setValue("slug", slugTransform(title), { shouldValidate: true });
			}
		});

		return () => subscription.unsubscribe();
	}, [slugTransform, setValue, watch]);

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-8 md:py-12'>
			<h2 className='text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-blue-200 text-transparent bg-clip-text text-center'>
				{post ? "Edit Post" : "Create New Post"}
				<span className='text-blue-400'>.</span>
			</h2>
			<div className='max-w-6xl mx-auto px-4'>
				<div className='bg-slate-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-700/50 shadow-2xl'>
					{/* Toast Message */}
					<Toast
						message={toastMessage}
						show={showToast}
						onClose={handleCloseToast}
					/>

					<form
						onSubmit={handleSubmit(submit)}
						className='flex flex-wrap gap-6 md:gap-8'
					>
						<div className='w-full lg:w-2/3 space-y-6'>
							{/* Title Field */}
							<div className='space-y-2'>
								<Input
									label='Title'
									className='w-full bg-slate-800/50 border-slate-700/50 focus:border-blue-500/50 rounded-xl'
									placeholder='Enter a title'
									{...register("title", { required: true })}
								/>
								{errors.title && (
									<p className='text-red-400 text-sm pl-1 bg-red-500/10 px-3 py-1.5 rounded-lg inline-block'>
										Title is required
									</p>
								)}
							</div>

							{/* Slug Field */}
							<div className='space-y-2'>
								<Input
									label='Slug'
									placeholder='Enter a slug'
									readOnly
									className='w-full bg-slate-800/50 border-slate-700/50 focus:border-blue-500/50 rounded-xl'
									{...register("slug", { required: true })}
									onInput={(e) => {
										setValue("slug", slugTransform(e.currentTarget.value), {
											shouldValidate: true,
										});
									}}
								/>
								{errors.slug && (
									<p className='text-red-400 text-sm pl-1 bg-red-500/10 px-3 py-1.5 rounded-lg inline-block'>
										Slug is required
									</p>
								)}
							</div>

							{/* Content Field (Rich Text Editor) */}
							<div className='space-y-2 text-white'>
								<RTE
									name='content'
									control={control}
									label='Content'
									defaultValue={getValues("content")}
								/>
							</div>
						</div>

						<div className='w-full lg:w-1/3 space-y-6'>
							{/* Image Upload Field */}
							<div className='space-y-4'>
								<div className='relative group'>
									<Input
										label='Featured Image'
										type='file'
										accept='image/*'
										className='w-full bg-slate-800/50 border-slate-700/50 focus:border-blue-500/50 rounded-xl file:bg-blue-500/20 file:text-blue-400 file:border-0 file:rounded-lg hover:file:bg-blue-500/30 transition-all duration-200'
										{...register("image", { required: !post })}
									/>
									{errors.image && (
										<p className='text-red-400 text-sm pl-1 mt-1 bg-red-500/10 px-3 py-1.5 rounded-lg inline-block'>
											Image is required
										</p>
									)}
								</div>
								{post && (
									<div className='relative group rounded-xl overflow-hidden'>
										<img
											className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
											src={fileManager.getFilePreview(post.imageId)}
											alt={post.title}
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'>
											<span className='text-white/90 text-sm font-medium bg-slate-900/90 px-3 py-1.5 rounded-full'>
												Current Image
											</span>
										</div>
									</div>
								)}
							</div>

							{/* Status Field */}
							<Select
								options={["active", "inactive"]}
								label='Status'
								className='w-full bg-slate-800/50 border-slate-700/50 focus:border-blue-500/50 rounded-xl'
								{...register("status", { required: true })}
							/>

							{/* Submit Button */}
							<Button
								type='submit'
								className={`w-full py-3 px-4 text-white rounded-xl shadow-lg transition-all duration-300 ${
									post
										? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/20"
										: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/20"
								}`}
							>
								{post ? "Update Post" : "Create Post"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default PostForm;
