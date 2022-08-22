import React from "react";
import Navbar from "../components/Navbar"
import SignUp from "../components/SignUp"
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { changeToken } from "../utils/helpers";
import "../Login.css";

function Login({ logOut, logIn, isLoggedIn, setIsLoggedIn, cookies, setCookie, user, setUser}) {

	const [signUp, setSignUp] = useState(false);

	return (
		<div>
			<h1>TradeWarZ</h1>
				{/* Login and Log out state functions */}
				{isLoggedIn ? (
					<>
						<button onClick={logOut}>Logout</button>
						<h3>{user.username} Logged In</h3>
					</>
				) : (
					signUp ? 
					(<SignUp toggle = {setSignUp} 
						setCookie={setCookie}
						setUser={setUser}
						setIsLoggedIn={setIsLoggedIn}
					/>) : 
					(<LoginForm 
						toggle = {setSignUp} 
						isLoggedIn={isLoggedIn} 
						setIsLoggedIn={setIsLoggedIn} 
						login={logIn} 
						logOut={logOut}
						cookies={cookies}
						setCookie={setCookie}
						user={user}
						setUser={setUser} 
						changeToken={changeToken}
						/>)
				)}
		</div>
	);
}

export default Login;
