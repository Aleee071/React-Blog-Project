import React from "react";
import { PostForm } from "../components";

function AddPost() {
	return (
		<div className='w-full min-h-screen py-8 md:py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950'>
			<div className='w-full max-w-7xl mx-auto px-4'>
				<PostForm />
			</div>
		</div>
	);
}

export default AddPost;
