import Link from "react-router-dom";
const Navbar = () => {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link to='/'>Landing</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/buy'>Buy</Link>
        </li>
        <li>
          <Link to='/sell'>Sell</Link>
        </li>
        <li>
          <Link to='/portfolio'>Portfolio</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
