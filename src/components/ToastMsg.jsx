import React, { useEffect, useState } from "react";

function Toast({ message, show, onClose }) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		// If toast should be shown
		if (show) {
			// Delay the opening transition
			const openTimeout = setTimeout(() => {
				setVisible(true); // Trigger the visible state change after the delay
			}, 300);

			// Automatically close after 2 seconds
			const closeTimeout = setTimeout(() => {
				setVisible(false);
				setTimeout(onClose, 300); // Wait for transition to complete before calling onClose
			}, 2000); // Automatically close after 2 seconds

			// Clean up timeouts if the component unmounts or `show` changes
			return () => {
				clearTimeout(openTimeout);
				clearTimeout(closeTimeout);
			};
		} else {
			setVisible(false); // Immediately hide if `show` is false
		}
	}, [show, onClose]);

	return (
		<div
			className={`fixed top-2/4 right-4 p-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg shadow-lg transform transition-all duration-500 ease-in-out z-50 ${
				visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
			}`}
		>
			<div className='flex items-center space-x-4'>
				{/* Icon for Toast */}
				<div className='w-7 h-7 bg-white text-blue-500 rounded-full flex items-center justify-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 16 16'
						className='w-4 h-4'
					>
						<path d='M8 1a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 1a6 6 0 1 0 0 12 6 6 0 0 0 0-12z' />
					</svg>
				</div>
				{/* Toast Message */}
				<p className='text-sm font-medium'>{message}</p>
			</div>
		</div>
	);
}

export default Toast;
