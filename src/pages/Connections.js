import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar"
import { signUp, login, checkToken, addStocks, deleteUser } from "../utils"

function Connections({ setIsLoggedIn, isLoggedIn, setUser, setCookie, cookies,
    logOut, user }) {
    const handleSignUp  = async () => {
        await signUp("test7", "email7", "password7", setUser, setCookie, setIsLoggedIn)
    }
    const handleLogin  = async () => {
        await login("Red", "Red", setUser, setCookie, setIsLoggedIn)
    }
    const handleCheckCookies  = async () => {
        await checkToken(cookies, setCookie, setUser, setIsLoggedIn)
    }
    const handleAddStocks  = async () => {
        await addStocks("GOOGL", "GOOGL", 1, 1, cookies, setUser)
    }
    // const handleUpdateCash = async () => {
    //     await updateCash(9000, setUser, cookies)
    // }
    const handleDeleteUser = async () => {
        await deleteUser(cookies, setUser, setCookie, setIsLoggedIn)
    }
    // const handleAddHistory = async () => {
    //     await addHistory(cookies, "symbol", 350.87, 23, false)
    // }

	return (
		<Cont>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
                logOut={logOut}
                user={user}
			/>
			<h2>This page is for testing connections</h2>
            <ButtonCont>
            <Button2 onClick={handleSignUp}>Sign up</Button2>
            <Button2 onClick={handleLogin}>login</Button2>
            <Button2 onClick={handleCheckCookies}>checkToken</Button2>
            <Button2 onClick={handleAddStocks}>addStocks</Button2>
            {/* <Button2 onClick={handleUpdateCash}>updateCash</Button2> */}
            <Button2 onClick={handleDeleteUser}>delete user</Button2>
            {/* <Button2 onClick={handleAddHistory}>addHistory</Button2> */}
            </ButtonCont>
		</Cont>
	);
}

export default Connections;

const Cont =  styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
    gap: 50px;
`

const ButtonCont =  styled.div`
	display: flex;
	align-items: center;
    justify-content: center;
    gap: 30px;
`

const Button2 = styled.button`
	background: #5e5df0;
	margin-top: 5px;
	border-radius: 12px;
	box-sizing: border-box;
	color: #ffffff;
	cursor: pointer;
	font-size: 16px;
	font-weight: 700;
	line-height: 24px;
	opacity: 1;
	outline: 0 solid transparent;
	padding: 8px 28px;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	width: fit-content;
	word-break: break-word;
	border: 0;
`;

