import React, { forwardRef, useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
	const id = useId();

	return (
		<div className='w-full'>
			{label && (
				<label
					htmlFor={id}
					className='block mb-2 text-sm font-medium text-gray-700'
				>
					{label}
				</label>
			)}
			<select
				className={`px-3 py-2 rounded-lg text-white outline-none focus:bg-slate-800/90 duration-200 border border-gray-200 w-full ${className}`}
				{...props}
				id={id}
				ref={ref}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

export default forwardRef(Select);
