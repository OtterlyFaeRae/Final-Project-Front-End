import { useState } from "react";
import styled from "styled-components"
import DropdownItem from "../components/DropdownItem";

function Buy() {

	const [ input, setInput ] = useState("")
	const [ tempStocks, setTempStocks ] = useState(['stock1', 'stock2', 'stock3', 'stock3'])
	const [ stockToBuy, SetStockToBuy ] = useState('')

	const handleClickClear = () => {
        setInput("")
    }

	const handleOnChange = async e => {
        setInput(e.target.value)
    }

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            setInput("");
        }
    }

	const handleClickSearch = () => {
        setInput("")
    }

	return (
		<Cont>
			<h2>This is the Buy page</h2>
			<SearchCont>
				<input type="text" placeholder="Search" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input} ></input>
				<button onClick={handleClickClear}  >X</button>
				<button onClick={handleClickSearch}>search</button>
			</SearchCont>
			<DropdownCont>
				<DropdownList>
					{
						tempStocks.map( (x,i) => (
							<DropdownItem stock={tempStocks[i]} key={i}/>
						))
					}
				</DropdownList>
			</DropdownCont>
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
// const Cont = styled.div`
// `
