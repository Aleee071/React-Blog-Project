import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../components";
import postManager from "../appwrite/postHandling";

function EditPost() {
	const [post, setPost] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			postManager.getPost(id).then((post) => {
				if (post) {
					setPost(post);
				}
			});
		} else {
			navigate("/");
		}
	}, [id, navigate]);

	return (
		post && (
			<div className='w-full min-h-screen py-8 md:py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950'>
				<div className='w-full max-w-7xl mx-auto px-4'>
					<PostForm post={post} />
				</div>
			</div>
		)
	);
}

export default EditPost;
