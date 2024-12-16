import React from "react";
import fileManager from "../appwrite/fileHandling";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({ imageId, title, $id, content, userName }) {
	return (
		<div className='bg-gradient-to-br from-slate-800 via-slate-800/95 to-slate-900 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden group hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300'>
			<Link to={`/post/${$id}`} className='block'>
				{/* Image Section */}
				<div className='aspect-video overflow-hidden relative'>
					<div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent z-10'></div>
					<img
						src={fileManager.getFilePreview(imageId)}
						alt={title}
						className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300'
						loading='lazy'
					/>
				</div>

				{/* Content Section */}
				<div className='p-5 relative'>
					<h2 className='text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200'>
						{title}
					</h2>
					<div className='text-sm text-slate-300/90 line-clamp-3 mb-4 browser-css'>
						{parse(content)}
					</div>

					<div className='flex items-center justify-between text-sm'>
						<span className='flex items-center gap-2 text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-full'>
							<svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
								<path d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'></path>
							</svg>
							{userName}
						</span>
						<span className='text-blue-400 font-medium text-sm hover:text-blue-300 transition-colors duration-200'>
							Read More →
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default PostCard;
