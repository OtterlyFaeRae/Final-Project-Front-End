const {useState} = require('react')
const {login} = require('../utils')

const LoginForm = ({toggle, setUser, changeToken, setCookie, setIsLoggedIn}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password, setUser, setCookie, setIsLoggedIn)
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
          <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username'/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
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