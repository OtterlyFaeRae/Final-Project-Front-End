export const signUp = async (username, email, password, setUser, setCookie) => {
    try {
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
          console.log(data.user);
          setUser( () => data.user)
          // setCookie(data.Token)
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
      console.log(data.username);
      // setUser(data.username)
      // changeToken(setCookie, data.token)
    } catch (error) {
      console.log(error);
    }
  };

  export const getToken = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}/login`, {
            method: "GET",
            headers: {
              'Authorization': token
            }
          });
          const data = await response.json()
          console.log(data)
    } catch (error) {
        console.log(error)
    }
  }

  // export const updateUser = async (username, email, password) => {

  // }

  export const deleteUser = async (username, password, setter) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
        headers: { "Content-Type": "application/json" },
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