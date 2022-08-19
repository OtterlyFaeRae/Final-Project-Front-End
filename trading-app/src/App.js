import "./App.css";
import { useState, useEffect } from "react";

// import all the pages here
import Login from "./pages/Login";
import Buy from "./pages/Buy";
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import Sell from "./pages/Sell";
import Connections from "./pages/Connections";
import { useCookies } from 'react-cookie'

// react router dom modules
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";

// import components
import Protected from "./components/Protected";
import LoginForm from "./components/LoginForm";
import { checkToken } from "./utils";

// utils
import { logout } from "./utils"


// ------------------------------------------------------------------- //
function App() {
	// login setup, determines if you are logged in, #TODO --> connect it with backend login function
	// state hooked variables
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [cookies, setCookie] = useCookies(["token"]);
	const [ user, setUser ] = useState("")

	useEffect( () => {
		checkToken(cookies, setCookie, setUser, setIsLoggedIn)
	}, [])

	// ------------------------------------------------------------------- //
	// state altering functions
	const logIn = () => {
		setIsLoggedIn(true); // once logged just set setIsLoggedIn as false
	};
	const logOut = () => {
		logout(setUser, setCookie, setIsLoggedIn)
		setIsLoggedIn(false);
	};
	// ------------------------------------------------------------------- //
	// main render component
	return (
		<BrowserRouter>

			<Routes>
				<Route path="/login" element={
				<Login 
					isLoggedIn={isLoggedIn} 
					setIsLoggedIn={setIsLoggedIn} 
					login={logIn} 
					logOut={logOut}
					cookies={cookies}
					setCookie={setCookie}
					user={user}
					setUser={setUser}
				/>} />

				{/* ----------------- PROTECTED PAGES  ------------------------ */}

				{/* Landing Page */}
				<Route
					path="/"
					element={
						<Protected isLoggedIn={isLoggedIn}>
							<Landing 
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								user={user}
							/>
						</Protected>
					}
				/>

				{/* Portfolio Page */}
				<Route
					path="/portfolio"
					element={
						<Protected 
						isLoggedIn={isLoggedIn}
						>
							<Portfolio 
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								user={user}
							/>
						</Protected>
					}
				/>

				{/* Buy Page */}
				<Route
					path="/buy"
					element={
						<Protected isLoggedIn={isLoggedIn}>
							<Buy 
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								user={user}
							/>
						</Protected>
					}
				/>

				{/* Sell Page */}
				<Route
					path="/sell"
					element={
						<Protected isLoggedIn={isLoggedIn}>
							<Sell 
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								user={user}
							/>
						</Protected>
					}
				/>

				{/* For testing connections */}
				<Route
					path="/connections"
					element={
						<Protected 
						isLoggedIn={isLoggedIn}
						>
							<Connections 
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								cookies={cookies}
								setCookie={setCookie}
								user={user}
								setUser={setUser}
							/>
						</Protected>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
