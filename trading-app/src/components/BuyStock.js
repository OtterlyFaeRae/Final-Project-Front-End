import { useState } from "react";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'

const BuyStock = ({}) => {

    const [ input, setInput ] = useState("")
    const navigate = useNavigate();

    const handleOnChange = async e => {
        setInput(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            setInput("");
            redir()
        }
    }

	const handleClick = () => {
        setInput("")
        redir()
    }

    const redir = () => {
        if (input) {
            navigate("/portfolio")
            alert("Purchase sucessful.")
        }
    }

    return (
        <BuyCont>
        <h4>Buy container.</h4>
        <StockCont>
            <TopCont>
                <p>Symbol</p>
                <p>Stock</p>
            </TopCont>
            <BottomCont>
                <p>Price</p>
                <p>Quantity</p>
				<input type="number" placeholder="Quantity" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input} ></input>
                <button onClick={handleClick} placeholder="buy">Buy</button>
            </BottomCont>
        </StockCont>
    </BuyCont>
    )
}

export default BuyStock

const BuyCont = styled.div`
    border: 2px solid black;
`
const StockCont = styled.div`
	display: flex;
    flex-direction: column;
	& > div > p {
		padding: 0 1rem;
	}
`
const TopCont = styled.div`
	display: flex;
`
const BottomCont = styled.div`
	display: flex;
`