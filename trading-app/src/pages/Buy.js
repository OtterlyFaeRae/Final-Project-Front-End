import { useEffect, useReducer, useState } from "react";
import styled from "styled-components"
import DropdownItem from "../components/DropdownItem";
import Navbar from "../components/Navbar"
import BuyStock from "../components/BuyStock"
// import { getPrice } from "../utils/av-api";
import { getPrices } from "../utils/finnhub-fetch";

function Buy({ setIsLoggedIn, isLoggedIn, user, cookies, setUser, logOut }) {

	const [ input, setInput ] = useState("")
	const [ tempStocks, setTempStocks ] = useState(['stock1', 'stock2', 'stock3', 'stock3'])
	const [ stockToBuy, SetStockToBuy ] = useState("")
	const [ price, setPrice ] = useState("")
	// const [ cash, setCash ] = useState(user.cash)

	const handleClickClear = () => {
        setInput("")
    }

	const handleOnChange = async e => {
        setInput(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.key === "Enter" && input) {
			searchStock()
        }
    }

	const handleClickSearch = async () => {
		if (input) {
			searchStock()
		}
    }

	const searchStock = async () => {
		const buyPrice = await getPrices([input])
		SetStockToBuy( () => input )
		if (!buyPrice) {
			SetStockToBuy( () => "No stock found.");
		}
		setPrice( buyPrice )
        setInput("")
	}

	useEffect( () => {

	}, [price])

	return (
		<>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
				logOut={logOut}
			/>
			<Cont>
				<h2>This is the Buy page.</h2>
				<p>Cash: {user.cash.toFixed(2)}</p>
				<SearchCont>
					<input type="text" placeholder="Search" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input} ></input>
					<button onClick={handleClickClear} >X</button>
					<button onClick={handleClickSearch}>search</button>
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
}

export default Buy;

const Cont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const SearchCont = styled.div`
`
const DropdownCont = styled.div`
`
const DropdownList = styled.ul`
`
// const BuyCont = styled.div`
// `