import { useEffect, useReducer, useState } from "react";
import styled from "styled-components"
import DropdownItem from "../components/DropdownItem";
import Navbar from "../components/Navbar"
import BuyStock from "../components/BuyStock"
import { getPrices } from "../utils/finnhub-fetch";

function Buy({ setIsLoggedIn, isLoggedIn, user, cookies, setUser, logOut }) {

	const [ input, setInput ] = useState("");
	const [ tempStocks, setTempStocks ] = useState(['stock1', 'stock2', 'stock3', 'stock3']);
	const [ stockToBuy, SetStockToBuy ] = useState("");
	const [ price, setPrice ] = useState("");

	const handleClickClear = () => {
        setInput("");
    };

	const handleOnChange = async e => {
        setInput(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === "Enter" && input) {
			searchStock();
        };
    };

	const handleClickSearch = async () => {
		if (input) {
			searchStock();
		};
    };

	const searchStock = async () => {
		const buyPrice = await getPrices([input]);
		SetStockToBuy( () => input );
		if (!buyPrice) {
			SetStockToBuy( () => "No stock found.");
		};
		setPrice( buyPrice );
        setInput("");
	};

	useEffect( () => {

	}, [price]);

	return (
		<>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn}
				isLoggedIn={isLoggedIn} 
				logOut={logOut}
			/>
			<Cont>
				<h2>Buy Stocks</h2>
				<br/>
				<p>Your Cash: ${user && user.cash.toFixed(2)}</p>
				<SearchCont>
					<Input type="text" placeholder="Search..." onKeyDown={handleKeyDown} onChange={handleOnChange} value={input}></Input>
					<ClearInput onClick={handleClickClear}>X</ClearInput>
					<SearchButton onClick={handleClickSearch}>Search</SearchButton>
				</SearchCont>
				<DropdownCont>
					<DropdownList>
						{
							input 
							&&
							tempStocks.map( (x,i) => (
								<DropdownItem stock={tempStocks[i]} key={i}/>
							))
						}
					</DropdownList>
				</DropdownCont>
				{
					stockToBuy 
					&&
					<BuyStock price={price} stockToBuy={stockToBuy} user={user} cookies={cookies} setUser={setUser}/>
				}
			</Cont>
		</>
	);
};

export default Buy;

const Cont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 5%;
`
const SearchCont = styled.div`
	margin: 1rem;
	width: 300px;
    height: 40px;
	margin-top: 5%;
	position: relative;
`
const Input = styled.input`
	width: 100%;
	height: 100%;
	border: solid #31356E 2px;
	border-radius: 10px;
	position: absolute;
	font-size: medium;
	background-color: black;
	color: white;
	padding: 8px 10px 8px 30px;
	&:focus {
		outline: none;
    /* border-color: #3d428a;
    box-shadow: 0 0 3px #3d428a; */
	}
	&:hover {
		outline: none;
    border-color: #483d8b;
    box-shadow: 0 0 10px #3d428a;
	}
`
const SearchButton = styled.button`
	position: absolute;
	height: 36px;
	border-radius: 6px;
	right: 0;
	background-color: #3d428a;
	&:hover {
		background-color: #3d428a;
		outline: solid #3d428a 1px;
		box-shadow: 0 0 15px #31356E;
	}
	border: none;
	cursor: pointer;
	color: rgba(255,255,255,0.7);
	font-size: medium;
	padding: 0 12px;
	margin: 2px;
`
const ClearInput = styled.button`
	background-color: black;
	border: none;
	color: rgba(255,255,255,0.55);
	&:hover {
		color: rgba(255,255,255,0.45);
	}
	position: absolute;
	z-index: 3;
    position: absolute;
    top: 10px;
    left: 10px;
	font-size: large;
	cursor: pointer;
`
const DropdownCont = styled.div`
`
const DropdownList = styled.ul`
`
// const BuyCont = styled.div`
// `