import React from "react";
import Navbar from "../components/Navbar"

function Connections({ setIsLoggedIn, isLoggedIn }) {
	return (
		<div>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
			/>
			<h2>This page is for testing connections</h2>
    
		</div>
	);
}

export default Connections;
