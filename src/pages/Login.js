import SignUp from "../components/SignUp";
import LoginForm from "../components/LoginForm";
import { useState, useEffect } from "react";
import { changeToken } from "../utils/helpers";
import styled from "styled-components";
import background from "../components/images/stocks3.jpg";
import { useNavigate } from "react-router-dom";

const Login = ({
  logOut,
  logIn,
  isLoggedIn,
  setIsLoggedIn,
  cookies,
  setCookie,
  user,
  setUser,
}) => {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Cont background={background}>
      <Header1>TradeWarZ</Header1>
      {isLoggedIn ? (
        <>
          <button onClick={logOut}>Logout</button>
          <h3>{user.username} Logged In</h3>
        </>
      ) : signUp ? (
        <SignUp
          toggle={setSignUp}
          setCookie={setCookie}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <LoginForm
          toggle={setSignUp}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          login={logIn}
          logOut={logOut}
          cookies={cookies}
          setCookie={setCookie}
          user={user}
          setUser={setUser}
          changeToken={changeToken}
        />
      )}
    </Cont>
  );
};

export default Login;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 90px;
  gap: 60px;
  align-items: center;
  min-height: 100vh;
  background-image: url(${(props) => props.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
`;

const Header1 = styled.h1`
  font-size: 12vmin;
  padding: 0 2rem;
  font-family: "Play", sans-serif;
  text-align: center;
`;
