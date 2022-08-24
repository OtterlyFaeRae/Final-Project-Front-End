import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";


const Navbar = ({ logOut }) => {

  const handleLogout = async () => {
    await logOut()
  }

  return (
    <Cont>
      <Link to='/'>
        <Header1>TradeWarz</Header1>
      </Link>
      <LinksCont>
        <NavItem>
          <Link to='/Portfolio'>Portfolio</Link>
        </NavItem>
        <NavItem>
          <Link to='/Buy'>Buy</Link>
        </NavItem>
        <NavItem>
          <Link to='/Sell'>Sell</Link>
        </NavItem>
        <div>
        <NavItem>
          <Button2 onClick={handleLogout}>Logout</Button2>
        </NavItem>
        </div>
      </LinksCont>
    </Cont>
  );
};

export default Navbar;

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: #5E5DF0;
  border-bottom-width: 1px;
  background-color: #212121;
`
const LinksCont = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3em;
  color: white;
  margin-left: 25px;
  list-style: none;
`
const NavItem = styled.li`
  text-decoration: none;
  font-size: 16px;
  color: white;
`

const Header1 = styled.h1`
  text-decoration: none;
  margin: 20px;
  font-size: 40px;
  text-align: center;
  color: white;
  margin-left: 30px;
`
const Button2 = styled.button`
  background: #5E5DF0;
  margin-top: 5px;
  border-radius: 12px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 8px 28px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: 0;
  margin-right: 15px;
`