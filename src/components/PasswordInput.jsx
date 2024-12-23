import React, { useState, useId, forwardRef } from "react";

const PasswordInput = ({ label, error, register, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false);
	const id = useId();

	return (
		<div className='space-y-2'>
			{label && (
				<label
					htmlFor={id}
					className='block text-sm font-medium text-slate-200'
				>
					{label}
				</label>
			)}
			<div className='relative'>
				<input
					type={showPassword ? "text" : "password"}
					className={`w-full  text-white/90 bg-slate-800/80 py-3 px-4 rounded-xl border border-slate-700/50
                    outline-none transition-all duration-200
                    placeholder:text-slate-400/60
                    hover:border-slate-600/80 hover:bg-slate-800/70
                    focus:border-blue-500/50 focus:bg-slate-800/90 focus:ring-2 focus:ring-blue-500/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-sm backdrop-blur-sm 
                    ${
											error ? "border-red-500/50" : "border-slate-700"
										} rounded-lg placeholder:text-slate-500 text-slate-200 `}
					ref={ref}
					id={id}
					{...props}
				/>
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 focus:outline-none  focus:text-slate-300 w-auto'
				>
					{showPassword ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.036 10.036 0 014.422-5.572M9.879 9.879A3 3 0 0112 15a3 3 0 002.121-5.121m-4.242 0L4.22 4.22m15.56 15.56l-5.467-5.467'
							/>
						</svg>
					)}
				</button>
			</div>
			{error && <p className='text-sm text-red-400'>{error}</p>}
		</div>
	);
};

export default forwardRef(PasswordInput);
