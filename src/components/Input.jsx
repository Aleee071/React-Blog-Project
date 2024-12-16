import { useId, forwardRef } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
	const id = useId();
	return (
		<div className={`w-full`}>
			{label && (
				<label
					htmlFor={id}
					className='text-white/90 mb-2 inline-block font-medium text-sm tracking-wide'
				>
					{label}
				</label>
			)}
			<input
				className={`w-full  text-white/90 bg-slate-800/80 py-3 px-4 rounded-xl border border-slate-700/50
                    outline-none transition-all duration-200
                    placeholder:text-slate-400/60
                    hover:border-slate-600/80 hover:bg-slate-800/70
                    focus:border-blue-500/50 focus:bg-slate-800/90 focus:ring-2 focus:ring-blue-500/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-sm backdrop-blur-sm
                    ${
											type === "file"
												? `
                        file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                        file:text-sm file:font-medium file:bg-blue-500/20 file:text-blue-400
                        hover:file:bg-blue-500/30 file:cursor-pointer file:transition-all file:duration-200
                    `
												: ""
										}`}
				ref={ref}
				type={type}
				id={id}
				{...props}
			/>
		</div>
	);
}

export default forwardRef(Input);
