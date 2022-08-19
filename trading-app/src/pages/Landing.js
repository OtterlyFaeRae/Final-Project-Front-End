import React from "react";
import Navbar from "../components/Navbar"

function Landing({ setIsLoggedIn, isLoggedIn }) {
	return (
		<div>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
			/>
			<h2>This is the Landing page</h2>
		</div>
	);
}

export default Landing;
