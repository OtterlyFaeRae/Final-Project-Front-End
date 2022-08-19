export const changeToken = (setCookie, token) => {
    setCookie("token", token, {
      path: "/"
    });
    console.log('token changed to: ' + token);
  }