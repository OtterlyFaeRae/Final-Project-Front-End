import { useState } from "react";
import { signUp } from "../utils";

const SignUp = ({toggle}) => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const submitHandler = async (event) => {
    event.preventDefault()
    await signUp(username, email, password);
  };
  
  return (
    <div className="login-form">
      <p id="sign-up-text">Sign up to make or lose lots of money.</p>
      <form onSubmit={submitHandler}>
        <input placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
        <br></br>
        <input placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
        <br></br>
        <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
        <br></br>
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
