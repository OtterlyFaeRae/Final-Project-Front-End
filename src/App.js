import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Buy from "./pages/Buy";
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import Sell from "./pages/Sell";
import History from "./pages/History";
import Connections from "./pages/Connections";
import { useCookies } from "react-cookie";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Protected from "./components/Protected";
import { checkToken } from "./utils";
import { logout } from "./utils";
import { createGlobalStyle } from "styled-components";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cookies, setCookie] = useCookies(["token"]);
  const [user, setUser] = useState("");

  useEffect(() => {
    checkToken(cookies, setCookie, setUser, setIsLoggedIn);
    // eslint-disable-next-line
  }, []);

  const logIn = () => {
    setIsLoggedIn(true);
  };
  const logOut = () => {
    logout(setUser, setCookie, setIsLoggedIn);
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              login={logIn}
              logOut={logOut}
              cookies={cookies}
              setCookie={setCookie}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Landing
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                logOut={logOut}
                cookies={cookies}
                setCookie={setCookie}
                setUser={setUser}
              />
            </Protected>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Portfolio
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                logOut={logOut}
              />
            </Protected>
          }
        />
        <Route
          path="/buy"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Buy
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                cookies={cookies}
                logOut={logOut}
                setUser={setUser}
              />
            </Protected>
          }
        />
        <Route
          path="/sell"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Sell
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                cookies={cookies}
                logOut={logOut}
                setUser={setUser}
              />
            </Protected>
          }
        />
        <Route
          path="/connections"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Connections
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                cookies={cookies}
                setCookie={setCookie}
                user={user}
                setUser={setUser}
                logOut={logOut}
              />
            </Protected>
          }
        />
        <Route
          path="/history"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <History
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                logOut={logOut}
              />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
	text-decoration: none;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', 'Oxygen',
	'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
	sans-serif;
	// dev tool
	/* outline: limegreen 1px solid; */
}
body {
	background-color: #212121;
	color: white;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;
