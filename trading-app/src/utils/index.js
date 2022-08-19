export const signUp = async (username, email, password, setter) => {
    try {
        const response = await fetch("http://localhost:5000/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          });
          const data = await response.json()
          console.log(data);
    } catch (error) {
        console.log(error) 
    }
}

export const login = async (username, password, setter) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  export const getToken = async () => {
    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "GET",
            'Authorization': token
          });
          const data = await response.json()
          console.log(data)
    } catch (error) {
        console.log(error)
    }
  }

  export const updateUser = async (username, email, password)


  

  export const deleteUser = async (username, password, setter) => {
    try {
      const response = await fetch("http://localhost:5000/user", {
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