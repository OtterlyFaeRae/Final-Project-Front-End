const Navbar = () => {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link to='/Landing'>Landing</Link>
        </li>
        <li>
          <Link to='/Buy'>Buy</Link>
        </li>
        <li>
          <Link to='/Sell'>Sell</Link>
        </li>
        <li>
          <Link to='/Portfolio'>Portfolio</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
