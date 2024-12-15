import React from "react";
import fileManager from "../appwrite/fileHandling";
import { Link } from "react-router-dom";

function PostCard({ imageId, title, $id, userName }) {
	return (
		<div className='max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white'>
			<Link to={`/post/${$id}`} className='group block'>
				{/* Image Section */}
				<div className='relative h-48 bg-gray-200'>
					<img
						src={fileManager.getFilePreview(imageId)}
						alt={title}
						className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
					/>
				</div>

				{/* Header Section */}
				<div className='p-4 flex items-center'>
					<h2 className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200'>
						{title}
					</h2>
					<span className='ml-auto text-gray-100 px-3 py-1 transition-colors duration-200 bg-slate-800 rounded text-sm'>
						user: {userName}
					</span>
				</div>
			</Link>
		</div>
	);
}

export default PostCard;
