import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components/index";
import postManager from "../appwrite/postHandling";

function EditPost() {
	const [post, setPost] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams(); //! HAVE TO RECHECK IT

	useEffect(() => {
		try {
			if (id) {
				postManager.getPost(id).then((post) => {
					if (post) setPost(post);
				});
			} else {
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	}, [id, navigate]);

	return post ? (
		<div className='py-8'>
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : null;
}

export default EditPost;
