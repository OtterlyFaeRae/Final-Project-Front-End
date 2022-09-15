import { changeToken } from "./helpers";

export const signUp = async (
  username,
  email,
  password,
  setUser,
  setCookie,
  setIsLoggedIn
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        pass: password,
      }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      setUser("");
      changeToken(setCookie, "");
      setIsLoggedIn(false);
      throw new Error("Incorred credentials.");
    }
    setUser(data.user);
    changeToken(setCookie, data.Token);
    setIsLoggedIn(true);
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const login = async (
  username,
  password,
  setUser,
  setCookie,
  setIsLoggedIn
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        pass: password,
      }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      setUser("");
      changeToken(setCookie, "");
      setIsLoggedIn(false);
      throw new Error("Incorred credentials.");
    }
    setUser(data.user);
    changeToken(setCookie, data.Token);
    setIsLoggedIn(true);
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const checkToken = async (
  cookies,
  setCookie,
  setUser,
  setIsLoggedIn
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/login`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.token,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      setUser("");
      changeToken(setCookie, "");
      setIsLoggedIn(false);
      throw new Error("Incorrect credentials.");
    }
    setUser(data.user);
    changeToken(setCookie, data.Token);
    setIsLoggedIn(true);
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const deleteUser = async (
  cookies,
  setUser,
  setCookie,
  setIsLoggedIn
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.token,
      },
    });
    if (response.status !== 200) {
      throw new Error("Error deleting user.");
    }
    setUser("");
    changeToken(setCookie, "");
    setIsLoggedIn(false);
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const addStocks = async (
  name,
  symbol,
  number,
  price,
  cookies,
  setUser
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_REST_API}/user/stocks`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
        method: "PATCH",
        body: JSON.stringify({
          addStock: {
            name: name,
            symbol: symbol,
            number: number,
            price: price,
          },
        }),
      }
    );
    const data = await response.json();
    if (!data) {
      throw new Error("Incorrect credentials.");
    }
    setUser(data.user);
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const logout = async (setUser, setCookie, setIsLoggedIn) => {
  setUser("");
  changeToken(setCookie, "");
  setIsLoggedIn(false);
};
