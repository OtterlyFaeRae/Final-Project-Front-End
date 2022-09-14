import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import Select from 'react-select';
import styled from "styled-components";
import SellStock from "../components/SellStock"
import { getPrices } from "../utils/stocks";
import background from "../images/stocks3.jpg";

function Sell({ setIsLoggedIn, isLoggedIn, user, cookies, setUser, logOut }) {
	// dropdown menu source: https://appdividend.com/2022/03/12/react-dropdown-select/

	const [ stocks, setStocks ] = useState([]);
	const [ stockToSell, setStockToSell ] = useState("");
	const [ price, setPrice ] = useState("");

	useEffect( () => {
		if (user) {
			setStocks(user.stocks.map( (stock, i) => ({ label: stock.name, value: i })));
		};
	}, [user] );

	useEffect( () => {
		if (user) {
			setStocks(user.stocks.map( (stock, i) => ({ label: stock.name, value: i })));
		};
		// eslint-disable-next-line
	}, [] );

	const handleChange = (options) => {
		setStockToSell(options);
	};

	const searchStock = async () => {
		const sellPrice = await getPrices([stockToSell.label])
		console.log(stockToSell.label);
		console.log("sellprice = " + sellPrice);
		if (sellPrice) {
			setPrice( () => sellPrice );
		};
	};

	useEffect( () => {
		if (stockToSell) {
			searchStock();
		};
		// eslint-disable-next-line
	}, [stockToSell] );

	// dropdown styles
	const colourStyles = {

		singleValue: (styles) => {
			return { 
				...styles, 
  				color: "#6d6d6e",
				}
		},

		placeholder: (styles) => {
			return { 
				...styles, 
  				color: "#6d6d6e",
				}
		},
		
		input: (styles) => {
			return { 
				...styles, 
  				caretColor: "white",
  				color: "white",
				fontSize: "20px",
			}
		},

		control: (styles) => {
			return { 
				...styles, 
				backgroundColor: "#212121", 
				border: "solid #5e5df0 1px",
				borderRadius: "5px",
  				padding: "5px",
  				fontSize: "20px",
  				outline: "none",
  				caretColor: "white",
  				color: "white",
				minWidth: "200px",
  				maxWidth: "220px",
				marginBottom: "50px",
				'&:hover': {
					border: "solid #5e5df0 1px",
				}
			}
		},
		menu: (styles) => {
					return {
						...styles,
						border: "solid #5e5df0 1px",
						backgroundColor: "#212121"	
						
					};
				},
			
		option: (styles) => {
				return {
					...styles,
					backgroundColor: "#212121",
					'&:hover': {
						backgroundColor: "#5e5df0",
					}
			}
		}
	}

	return (
		<Cont background={background}>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
				logOut={logOut}
				user={user}
			/>
			<Content>
				<h2>Sell Stocks</h2>
				<p>Your Cash: ${user && user.cash.toFixed(2)}</p>
				<Stock>
				<div>
				<Select 
					placeholder={<p>Select stock...</p>}
					onChange={ handleChange } 
					options={ stocks } 
					styles={colourStyles}
					/>
				</div>
				{
					stockToSell && price
					&&
					<SellStock price={price} stockToSell={stockToSell} user={user} cookies={cookies} setUser={setUser}/>
				}
				</Stock>
			</Content>
		</Cont>	
	);
}

export default Sell;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: url(${(props) => props.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  gap: 100px;
  @media (max-width: 768px) {
		gap: 50px;
	} 
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  border-radius: 10px;
  border: solid;
  background-color: #212121;
  border-color: #5e5df0;
  border-width: 1.5px;
  opacity: 1;
  gap: 25px;
  max-width: 75%;
  /* min-width: 603px;  */
  /* padding-left: 30px; */
  width: 75vw;
  max-width: 600px;
  margin-bottom: 20px;
  @media (max-width: 450px) {
      width: 85vw;
  	} 
`;

const Stock = styled.div`
width: 100%;
display: flex;
justify-content: space-evenly;
margin-top: 30px;
margin-bottom: 15px;
@media (max-width: 610px) {
	flex-direction: column;
	width: auto;
}
`
