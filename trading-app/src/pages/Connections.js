import React from "react";
import Navbar from "../components/Navbar"
import { signUp, login } from "../utils"

function Connections({ setIsLoggedIn, isLoggedIn, setUser, setCookie }) {
 
    const handleSignUp  = async () => {
        // recieve user and token.  set user set token.
        setUser(() => "test")
        // await signUp("test5", "email5", "password5", setUser, setCookie)
    }
    const handleLogin  = async () => {
        // recieve user and token.  set user set token.
        await login("test2", "password2", setUser, setCookie)
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
            <button>checkToken</button>
            <button>delete user</button>
            <button>logout (maybe)</button>
    
		</div>
	);
}

export default Connections;
