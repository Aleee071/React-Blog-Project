import { useId, forwardRef } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
	const id = useId();
	return (
		<div className={`w-full ${className}`}>
			{label && (
				<label htmlFor={id} className='text-black/100 mb-2 inline-block'>
					{label}
				</label>
			)}
			<input
				className='outline-none w-full bg-transparent py-1.5 px-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
				ref={ref}
				type={type}
				id={id}
				{...props}
			/>
		</div>
	);
}

export default forwardRef(Input);
