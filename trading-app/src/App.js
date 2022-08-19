import "./App.css";
import { useState } from "react";

// import all the pages here
import Login from "./pages/Login";
import Buy from "./pages/Buy";
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import Sell from "./pages/Sell";

// react router dom modules
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";

// import components
import Protected from "./components/Protected";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";

// ------------------------------------------------------------------- //
function App() {
	// login setup, determines if you are logged in, #TODO --> connect it with backend login function
	// state hooked variables
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [signUp, setSignUp] = useState(false);

	// ------------------------------------------------------------------- //
	// state altering functions
	const logIn = () => {
		setIsLoggedIn(true); // once logged just set setIsLoggedIn as false
	};
	const logOut = () => {
		setIsLoggedIn(false);
	};
	// ------------------------------------------------------------------- //
	// main render component
	return (
		<BrowserRouter>
			<div className= "container">
				<h1>TradeWarZ</h1>

				{/* Login and Log out state functions */}
				{isLoggedIn ? (
					<>
						<button onClick={logOut}>Logout</button>
						<h3>User Logged In</h3>
						<Navbar />
					</>
				) : (
					signUp ? (<SignUp toggle = {setSignUp} />) : (<LoginForm toggle = {setSignUp} logIn = {logIn} />)
				)}
			</div>
			<Routes>
				<Route path="/login" element={<Login />} />

				{/* ----------------- PROTECTED PAGES  ------------------------ */}

				{/* Landing Page */}
				<Route
					path="/"
					element={
						<Protected isLoggedIn={isLoggedIn}>
							<Landing />
						</Protected>
					}
				/>

				{/* Portfolio Page */}
				<Route
					path="/portfolio"
					element={
						<Protected isLoggedIn={isLoggedIn}>
							<Portfolio />
						</Protected>
					}
				/>

				{/* Buy Page */}
				<Route
					path="/buy"
					element={
						<Protected isLoggedIn={isLoggedIn}>
							<Buy />
						</Protected>
					}
				/>

				{/* Sell Page */}
				<Route
					path="/sell"
					element={
						<Protected isLoggedIn={isLoggedIn}>
							<Sell />
						</Protected>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
