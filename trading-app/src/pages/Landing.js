import React from "react";
import Navbar from "../components/Navbar"

function Landing({ setIsLoggedIn, isLoggedIn, logOut }) {
	return (
		<div>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
				logOut={logOut}
			/>
			<h2>This is the Landing page</h2>
		</div>
	);
}

export default Landing;
