export const changeToken = (setCookie, token) => {
  setCookie("token", token, {
    path: "/"
  });
  console.log('token changed to: ' + token);
}

const convert = (dollars) => {
  // const pounds = Math.round((dollars * 0.85) * 100)/100
  const pounds = Number((dollars * 0.85).toFixed(2))
  const response = {
    pounds: pounds,
    poundsDisplay: pounds.toFixed(2)
  }
  console.log(response)
  return response.poundsDisplay
}


convert(1)
convert(2)
convert(3)
convert(4)
convert(5)
convert(6)
convert(7)
convert(8)
convert(9)
convert(10)