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
		<div className='bg-gray-50 p-8 rounded-lg shadow-lg'>
			{/* Toast Message */}
			<Toast
				message={toastMessage}
				show={showToast}
				onClose={handleCloseToast}
			/>
			<form onSubmit={handleSubmit(submit)} className='flex flex-wrap gap-6'>
				<div className='w-full md:w-2/3 px-4'>
					{/* Title Field */}
					<Input
						label='Title'
						className='w-full'
						placeholder='Enter a title'
						{...register("title", { required: true })}
					/>
					{errors.title && (
						<p className='text-red-500 text-sm mt-1'>Title is required</p>
					)}

					{/* Slug Field */}
					<Input
						label='Slug'
						placeholder='Enter a slug'
						className='w-full mt-4 mb-4'
						{...register("slug", { required: true })}
						onInput={(e) => {
							setValue("slug", slugTransform(e.currentTarget.value), {
								shouldValidate: true,
							});
						}}
					/>
					{errors.slug && (
						<p className='text-red-500 text-sm mt-1'>Slug is required</p>
					)}

					{/* Content Field (Rich Text Editor) */}
					<RTE
						name='content'
						control={control}
						label='Content'
						defaultValue={getValues("content")}
						className='mt-4'
					/>
				</div>

				<div className='w-full md:w-1/3 px-4'>
					{/* Image Upload Field */}
					<Input
						label='Image'
						type='file'
						accept='image/*'
						className='w-full mt-4'
						{...register("image", { required: true })}
					/>
					{post && (
						<div className='w-full mt-4 mb-6'>
							<img
								className='rounded-lg w-full object-cover'
								src={fileManager.getFilePreview(post.imageId)}
								alt={post.title}
							/>
						</div>
					)}

					{/* Status Field */}
					<Select
						options={["active", "inactive"]}
						label='Status'
						className='w-full mt-4'
						{...register("status", { required: true })}
					/>

					{/* Submit Button */}
					<Button
						type='submit'
						className={`w-full mt-6 py-2 px-4 text-white rounded-lg shadow-md transition duration-300 ${
							post
								? "bg-green-500 hover:bg-green-600"
								: "bg-blue-500 hover:bg-blue-600"
						}`}
					>
						{post ? "Update Post" : "Create Post"}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default PostForm;
