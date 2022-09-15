export const changeToken = (setCookie, token) => {
  setCookie("token", token, {
    path: "/",
  });
};

export const toPounds = (dollars) => {
  const rate = 0.85;
  return parseFloat((Math.round(dollars * rate * 100) / 100).toFixed(2));
};
