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
          const data = await response.json();
          console.log("Found user : ");
          console.log(data);
          if (response.status !== 200) {
            setUser("")
            changeToken(setCookie, "")
            setIsLoggedIn(false)
            if (data.err) {
              throw new Error("Incorred credentials.")
            }
            return 1
          } else {
            setUser( data.user)
            changeToken(setCookie, data.Token)
            setIsLoggedIn(true)
          };
    } catch (error) {
        console.log(error);
        return 0
    }
}

export const login = async (username, password, setUser, setCookie, setIsLoggedIn) => {
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
      console.log(data);
      if (response.status !== 200) {
        setUser("")
        changeToken(setCookie, "")
        setIsLoggedIn(false)
        if (data.err) {
          throw new Error("Incorred credentials.")
        }
        return 1
      } else {
        setUser( data.user)
        changeToken(setCookie, data.Token)
        setIsLoggedIn(true)
      };
    } catch (error) {
      console.log(error);
      return 0
    };
  };

  export const checkToken = async (cookies, setCookie, setUser, setIsLoggedIn) => {
  
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}/login`, {
            method: "GET",
            headers: { 
              "Content-Type": "application/json",
              'Authorization': cookies.token
          },
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

  export const deleteUser = async (cookies, setUser, setCookie, setIsLoggedIn) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API}/user`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': cookies.token
      },
      });
      if (response.status === 200) {
        setUser("")
        changeToken(setCookie, "")
        setIsLoggedIn(false)
      } else {
        throw new Error("Error deleting user.")
      }

    }catch (error) {
        console.log(error)
    }
}

export const addStocks = async (name, symbol, number, cookies, setUser) => {
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
    setUser(data.user)

  }catch (error) {
      console.log(error)
  }
}

export const logout = async (setUser, setCookie, setIsLoggedIn) => {
  setUser("")
  changeToken(setCookie, "")
  setIsLoggedIn(false)
}

export const updateCash = async (newCash, setUser, cookies) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/user/cash`, {
      headers: { 
        "Content-Type": "application/json",
        'Authorization': cookies.token
    },
      method: "PATCH",
      body: JSON.stringify({
          "newCash": newCash
      }),
    });
    const data = await response.json();
    console.log(data);
    // setUser(data.user)

  } catch (error) {
      console.log(error)
  }
}
