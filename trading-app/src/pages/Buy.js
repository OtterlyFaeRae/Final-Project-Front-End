import { useState } from "react";
import styled from "styled-components"
import DropdownItem from "../components/DropdownItem";
import Navbar from "../components/Navbar"
import BuyStock from "../components/BuyStock"

function Buy({ setIsLoggedIn, isLoggedIn }) {

	const [ input, setInput ] = useState("")
	const [ tempStocks, setTempStocks ] = useState(['stock1', 'stock2', 'stock3', 'stock3'])
	const [ stockToBuy, SetStockToBuy ] = useState('')

	const handleClickClear = () => {
        setInput("")
    }

	const handleOnChange = async e => {
        setInput(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.key === "Enter") {
			SetStockToBuy( () => e.target.value )
            setInput("");
        }
    }

	const handleClickSearch = () => {
		SetStockToBuy( () => input )
        setInput("")
    }

	return (
		<Cont>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
			/>
			<h2>This is the Buy page</h2>
			<SearchCont>
				<input type="text" placeholder="Search" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input} ></input>
				<button onClick={handleClickClear}  >X</button>
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
				stockToBuy && !input
				&&
				<BuyStock />
			}
		</Cont>
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