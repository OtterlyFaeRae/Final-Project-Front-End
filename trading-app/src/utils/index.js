import { changeToken } from "./helpers";

export const signUp = async (username, email, password, setUser, setCookie, setIsLoggedIn) => {

    try {
        console.log('Signup Hit')
        const response = await fetch(`${process.env.REACT_APP_REST_API}/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              email: email,
              pass: password
            }),
          });
          const data = await response.json()
          console.log("Found user : ");
          console.log(data);
          setUser( data.user)
          changeToken(setCookie, data.Token)
          setIsLoggedIn(true)
          return data
    } catch (error) {
        console.log(error) 
    }
}

export const login = async (username, password, setUser, setCookie) => {
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
      console.log("Found user : ");
      console.log(data.user);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const checkToken = async (cookies, setCookie, setUser, setIsLoggedIn) => {
  
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}/login`, {
            method: "GET",
            headers: {
              headers: { "Content-Type": "application/json" },
              'Authorization': cookies.token
            }
          });
          const data = await response.json()
          console.log(data)
          if (response.status !== 200) {
            setUser("")
            changeToken(setCookie, "")
            setIsLoggedIn(false)
          } else {
            setUser( data.user)
            changeToken(setCookie, data.Token)
            setIsLoggedIn(true)
          }
    } catch (error) {
        console.log(error)
    }
  }

  // export const updateUser = async (username, email, password) => {

  // }

  export const deleteUser = async (username, password, cookies) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API}/user`, {
        headers: {
          'Authorization': cookies.token
        },
        method: "DELETE",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data.user);
      console.log("User Deleted");

    }catch (error) {
        console.log(error)
    }
}

export const addStocks = async (name, symbol, number, cookies) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/user/stocks`, {
      headers: { 
        "Content-Type": "application/json",
        'Authorization': cookies.token
    },
      method: "PATCH",
      body: JSON.stringify({
        "addStock": {
          "name": name,
          "symbol": symbol,
          "number": number
        }
      }),
    });
    const data = await response.json();
    console.log(data);
  }catch (error) {
      console.log(error)
  }
}