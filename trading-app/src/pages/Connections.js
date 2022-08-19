import React from "react";
import Navbar from "../components/Navbar"
import { signUp, login, checkToken } from "../utils"

function Connections({ setIsLoggedIn, isLoggedIn, setUser, setCookie, cookies }) {
 
    const handleSignUp  = async () => {
        // recieve user and token.  set user set token.
        await signUp("test7", "email7", "password7", setUser, setCookie)
    }
    const handleLogin  = async () => {
        // recieve user and token.  set user set token.
        await login("Red", "Red", setUser, setCookie)
    }
    const handleCheckCookies  = async () => {
        // recieve user and token.  set user set token.
        await checkToken(cookies, setCookie, setUser)
    }

	return (
		<div>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
			/>
			<h2>This page is for testing connections</h2>

            <button onClick={handleSignUp}>Sign up</button>
            <button onClick={handleLogin}>login</button>
            <button onClick={handleCheckCookies}>checkToken</button>
            <button>delete user</button>
            <button>logout (maybe)</button>
    
		</div>
	);
}

export default Connections;
