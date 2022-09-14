export const changeToken = (setCookie, token) => {
  setCookie("token", token, {
    path: "/"
  });
  console.log('token changed to: ' + token);
};

export const toPounds = (dollars) => {
  const rate = 0.85
  return parseFloat((Math.round(dollars * rate * 100) / 100).toFixed(2));
};
