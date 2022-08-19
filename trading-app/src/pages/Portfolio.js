import React from "react";
import Navbar from "../components/Navbar"

function Portfolio({ setIsLoggedIn, isLoggedIn }) {
	return (
		<div>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
			/>
			<h2>This is the Portfolio Page</h2>
		</div>
	);
}

export default Portfolio;
