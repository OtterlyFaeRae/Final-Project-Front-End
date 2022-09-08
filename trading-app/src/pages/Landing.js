import Navbar from "../components/Navbar"
import styled from "styled-components";
import background from "../images/stocks3.jpg";
import { useCallback, useEffect, useState } from "react";
import { deleteUser } from ".././utils"

function Landing({ setIsLoggedIn, isLoggedIn, logOut, user, cookies, setCookie, setUser }) {

  const [ deleteAccountString, setDeleteAccountString ] = useState("");

  const handleKeyPress = useCallback((event) => {
    setDeleteAccountString( x => x + event.key )
	}, []);

  useEffect( () => {
    if (deleteAccountString.slice(-8) === "delEnter"){
      deleteUser(cookies, setUser, setCookie, setIsLoggedIn)
      alert("Your account has been sucessfully deleted.")
    }
		// eslint-disable-next-line
  }, [deleteAccountString])

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);
		return () => {
		  document.removeEventListener('keydown', handleKeyPress);
		};
		// eslint-disable-next-line
	}, [handleKeyPress]);

	return (
		<Cont background={background}>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
				logOut={logOut}
        user={user}
			/>
			<Content>
				<Header1>Welcome to TradeWarZ</Header1>
				<P>TradeWarZ is a trading simulator where you can buy and sell stocks on the New York Stock Exchange.</P>
        <P>We then keep track of the real-time value of your portfolio!</P>
        <P>You start with $5000 which is yours to invest however you want.</P>
        <P>Hit the button below to get started.</P>
				<Button2 href='/buy'>Buy some stocks!</Button2>
        <P>This application was built by Liam, Mahed, Mohammed, Saoirse and Shaun.</P>
        <P>Data provided for free by Finnhub Stock API. View Finnhub's <Terms href="https://finnhub.io/terms-of-service#:~:text=You%20hereby%20agree%20to%20not,use%20unless%20explicitly%20stated%20otherwise" target="_blank" rel="noopener noreferrer">terms of service.</Terms></P>
        <P>To delete your account, type 'del' + 'Enter'.</P>
			</Content>
		</Cont>
	);
}

export default Landing;

const Cont =  styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url(${props => props.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  gap: 100px;
  @media (max-height: 740px) {
    padding-bottom: 800px;
  	} 
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 30px;
  padding-right: 10px;
  padding-left: 2rem;
  border-radius: 2rem;
  border: solid;
  background-color: #212121;
  border-color: #5E5DF0;
  border-width: 1.5px;
  opacity: 0.9;
  gap: 15px;
  /* min-width: 55%; */
  width: 75vw;
  /* max-width: 1000px; */
  @media (max-width: 450px) {
      width: 85vw;
  	} 
`
  const Header1 =  styled.h1`
	font-size: 60px;
  /* font-size: clamp(40px, 60px, 60px); */
	text-align: center;
  @media (max-width: 960px) {
    font-size: 45px;
  	} 
    @media (max-width: 390px) {
    font-size: 40px;
  	} 
`

const Button2 = styled.a`
  background: #5E5DF0;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  box-sizing: border-box;
  color: #FFFFFF;
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
  border: 0;
  margin-right: 15px;
`

const Terms = styled.a`
  font-weight: bold;
  color: #5E5DF0;
  display: inline-block;
	position: relative;
  padding-bottom: 7px;
  &:after {
		content: '';
		position: absolute;
		width: 100%;
		transform: scaleX(0);
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #5E5DF0;
		transform-origin: bottom right;
		transition: transform 0.25s ease-out;
	  }
	  &:hover:after {
		transform: scaleX(1);
		transform-origin: bottom left;
	  }
`

const P = styled.p`
text-align: center;
@media (max-width: 768px) {
    font-size: smaller;
  	} 
`
