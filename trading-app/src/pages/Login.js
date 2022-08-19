import React from "react";
import Navbar from "../components/Navbar"
import SignUp from "../components/SignUp"
import LoginForm from "../components/LoginForm";
import { useState } from "react";

function Login({ logOut, logIn, isLoggedIn, setIsLoggedIn }) {

	const [signUp, setSignUp] = useState(false);

	return (
		<div>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
			/>
			<div>Main Title - TradeWarZ</div>

				{/* Login and Log out state functions */}
				{isLoggedIn ? (
					<>
						<button onClick={logOut}>Logout</button>
						<h3>User Logged In</h3>
					</>
				) : (
					signUp ? (<SignUp toggle = {setSignUp} />) : (<LoginForm toggle = {setSignUp} logIn = {logIn} />)
				)}
			<h2>This is the Login page</h2>
		</div>
	);
}

export default Login;
