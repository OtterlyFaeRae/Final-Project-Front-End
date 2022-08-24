import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = ({ logOut, user }) => {
	const handleLogout = async () => {
		await logOut();
	};
	return (
		<Cont>
			<Left>
				<Logo to="/">
					<Header1>TradeWarZ</Header1>
				</Logo>
				<NavLink to="/Portfolio">Portfolio</NavLink>
				<NavLink to="/Buy">Buy</NavLink>
				<NavLink to="/Sell">Sell</NavLink>
			</Left>
			<LinksCont>
				<p>Logged in as {user.username}</p>
				<p>Total funds: ${user && user.cash.toFixed(2)}</p>
				<Button2 onClick={handleLogout}>Logout</Button2>
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
	border-bottom-color: #5e5df0;
	border-bottom-width: 1px;
	background-color: #212121;
	padding-left: 30px;

	/* shaun */

	box-shadow: 0 4px 2px -2px #5e5df0;

	padding-top: 20px;
	padding-bottom: 20px;
`;

const NavLink = styled(Link)` {
	display: inline-block;
	position: relative;
	color: white;
	padding-bottom: 7px;
	margin-top: 5px;

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
	  }`

const Logo = styled(Link)` {

		  }`


const LinksCont = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3em;
	color: white;
	margin-left: 25px;
	list-style: none;
`;

// TradeWarZ title style
const Header1 = styled.h1`
	text-decoration: none;
	font-size: 40px;
	text-align: center;
	color: white;
	&:after {
		text-decoration: none;
	  }
	  &:hover:after {
		text-decoration: none;
	  }
`;

const Button2 = styled.button`
	background: #5e5df0;
	border-radius: 12px;
	box-sizing: border-box;
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
	word-break: break-word;
	border: 0;
	margin-right: 15px;
`;
const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 3em;
	font-weight: bold;
	&:hover {
		color: #1167a8;
	}
`;
