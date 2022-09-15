import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Navbar = ({ logOut, user }) => {

  const [ menuOpen, setMenuOpen ] = useState(false)

  const handleClickMenu = () => {
    setMenuOpen( !menuOpen )
  }

  const handleLogout = async () => {
    await logOut();
  };
  return (
    <Cont>
      <Left>
        <Logo to="/">
          <Header1>TradeWarZ</Header1>
        </Logo>
		<Navlinks menuOpen={menuOpen}>
			<Ul>
				<Li><NavLink to="/Portfolio">Portfolio</NavLink></Li>
				<Li><NavLink to="/Buy">Buy</NavLink></Li>
				<Li><NavLink to="/Sell">Sell</NavLink></Li>
				<Li><NavLink to="/History">History</NavLink></Li>
        <Logout onClick={handleLogout}><NavLink to="/">Logout</NavLink></Logout>
			</Ul>
		</Navlinks>
      </Left>
      <UserInfoCont>
        <UserCont>Logged in as {user.username}</UserCont>
        <CashCont><CashText>Cash: </CashText>${user && user.cash.toFixed(2)}</CashCont>
        <Button2 onClick={handleLogout}>Logout</Button2>

        <ToggleButton href="#" onClick={handleClickMenu}>
          <Bar></Bar>
          <Bar></Bar>
          <Bar></Bar>
        </ToggleButton>
      </UserInfoCont>
    </Cont>
  );
};

export default Navbar;

const Cont = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: #5e5df0;
  border-bottom-width: 1px;
  background-color: #212121;
  box-shadow: 0 4px 2px -2px #5e5df0;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Header1 = styled.h1`
  text-decoration: none;
  font-size: clamp(28px, 4vw, 40px);
  text-align: center;
  color: white;
  padding: 0 1rem 0 1rem;
  &:after {
    text-decoration: none;
  }
  &:hover:after {
    text-decoration: none;
  }
`;

const Navlinks = styled.ul`
    /* height: 100%; */
    @media (max-width: 768px) {
      position: absolute;
      top: 4rem;
      right: 0;
      z-index: 10;
      /* margin-right: 1rem; */
      display: ${ props => props.menuOpen === true ? "flex" : "none" };
      width: 100vw;
  	}
`;

const Ul = styled.ul`
    display: flex;
    @media (max-width: 768px) {
      z-index: 100;
      flex-direction: column;
      width: 100%;
  	}
`;
const Li = styled.li`
    list-style: none;
`;

const NavLink = styled(Link)`
	display: block;
	position: relative;
	color: white;
	padding: 7px 0 7px 0 ;
	margin: 0.8rem;
  background-color: #212121;
	&:after {
		content: '';
		position: absolute;
		width: 100%;
		transform: scaleX(0);
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #5E5DF0;
		transform-origin: bottom right;
		transition: transform 0.25s ease-out;
	  }
	  &:hover:after {
		transform: scaleX(1);
		transform-origin: bottom left;
    }
    @media (max-width: 768px) {
      text-align: center;
      padding: 1rem 4rem 1rem 4rem;
      margin: 0;
      z-index: 10;
      outline: #2e2e2e solid 1px;
  	}
`;
const Logout = styled.li`
    list-style: none;
    display: none;
    @media (max-width: 768px) {
      display: block;
  	}
`;

const Logo = styled(Link)`
`;

const UserInfoCont = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 1rem; */
  color: white;
  /* margin-left: 25px; */
  list-style: none;
`;

const UserCont = styled.p`
  @media (max-width: 950px) {
		display: none;
  	}
	margin-right: 1.5rem;
`;
const CashCont = styled.p`
	margin-right: 1.5rem;
`;
const CashText = styled.span`
  @media (max-width: 430px) {
		display: none;
  	}
`;
const Button2 = styled.button`
/* position: absolute; */
  background: #5e5df0;
  border-radius: 12px;
  color: #ffffff;
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
  border: 0;
  margin-right: 1rem;
  @media (max-width: 768px) {
		display: none;
  	}
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  /* gap: 3em; */
  font-weight: bold;
  &:hover {
    color: #1167a8;
  }
`;

const ToggleButton = styled.a`
    /* position: absolute; */
    /* top: .75rem; */
    /* right: 1rem; */
    margin-right: 1rem;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    @media (max-width: 768px) {
      display: flex;
      background-color: #212121;
  	}
`;
const Bar = styled.span`
    height: 3px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
`;