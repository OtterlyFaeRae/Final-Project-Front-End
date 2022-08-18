const LoginForm = ({toggle}) => {
  return (
    <div className="login-form">
      <form>
          <input placeholder="Username"/>
        <br></br>
          <input type="password" placeholder="Password"/>
        <br></br>
        <button className="submit" type="submit">Log In</button>
      </form>
      {/* set this to appear if login fails */}
      <p>Incorrect username or password</p>
      <p>Not got an account?</p>
      <button onClick = {() => toggle(true)}>Sign Up</button>
    </div>
  );
};

export default LoginForm;