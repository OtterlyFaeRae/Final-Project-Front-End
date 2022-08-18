const SignUp = ({toggle}) => {
  return (
    <div className="login-form">
      <p id="sign-up-text">Sign up to make or lose lots of money.</p>
      <form>
        <input placeholder="Username" />
        <br></br>
        <input placeholder="Email" />
        <br></br>
        <input type="password" placeholder="Password" />
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
