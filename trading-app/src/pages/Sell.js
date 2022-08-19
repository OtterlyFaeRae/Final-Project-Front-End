import React from "react";
import Navbar from "../components/Navbar"

function Sell({ setIsLoggedIn, isLoggedIn }) {
	return (
		<div>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
			/>
			<h2>This is the Sell page</h2>
		</div>
	);
}

export default Sell;
