import { useState } from "react";
import { signUp } from "../utils";

const SignUp = ({toggle, setUser, setCookie, setIsLoggedIn}) => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const submitHandler = async (event) => {
    event.preventDefault()
    await signUp(username, email, password, setUser, setCookie, setIsLoggedIn);
  };
  
  return (
    <div className="login-form">
      <h2>Sign Up</h2>
      <form onSubmit={submitHandler}>
        <input placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
        <input placeholder="Email" value={email}onChange={(event) => setEmail(event.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button className="submit" type="submit">Sign Up</button>
      </form>
      {/* Display below if sign up fails */}
      <p>The username or email has already been registered</p>
      <p>Already have an account?</p>
      <button onClick = {() => toggle(false)}>Click here to login</button>
    </div>
  );
};

export default SignUp;
