import React from "react";

function Logo({
	width = "100px",
	height = "80px",
	color = "#000",
	fontFamily = "Arial, sans-serif",
}) {
	return (
		<div
			style={{
				width,
				height,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontFamily,
				fontSize: "1.2rem",
				fontWeight: "bold",
				color,
				borderRadius: "50%",
				backgroundColor: "#f3f4f6", // Light background to make it stand out
				boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
				overflow: "hidden",
				textTransform: "uppercase",
			}}
		>
			Logo
		</div>
	);
}

export default Logo;
