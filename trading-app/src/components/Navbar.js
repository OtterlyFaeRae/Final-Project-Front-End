import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";


const Navbar = ({ setIsLoggedIn, isLoggedIn, logOut }) => {


  const handleLogout = async () => {
    await logOut()

  }

  return (
    <Cont>
      <LinksCont>
      
        <NavItem>
          <Link to='/'>Landing</Link>
        </NavItem>
        <NavItem>
          <Link to='/Portfolio'>Portfolio</Link>
        </NavItem>
        <NavItem>
          <Link to='/Buy'>Buy</Link>
        </NavItem>
        <NavItem>
          <Link to='/Sell'>Sell</Link>
        </NavItem>
        <NavItem>
          <Link to='/connections'>Connections</Link>
        </NavItem>
        <NavItem>
          {/* <Link onClick={handleLogout} to='/login'>Logout</Link> */}
          <p onClick={handleLogout}>Logout</p>
        </NavItem>
      </LinksCont>
    </Cont>
  );
};

export default Navbar;

const Cont = styled.div`
`
const LinksCont = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`
const NavItem = styled.li`
padding: 0 1rem`