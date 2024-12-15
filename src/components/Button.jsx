const Button = ({ type = "", children, className = "", ...props }) => (
	<button
		className={`px-4 py-2 rounded-lg bg-blue-600 text-white ${className}`}
		{...props}
	>
		{children}
	</button>
);

export default Button;
