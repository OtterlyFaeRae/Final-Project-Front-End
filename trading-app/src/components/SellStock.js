import { useState } from "react";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { addStocks, updateCash } from "../utils";

const SellStock = ({ price, stockToSell, user, cookies, setUser }) => {

    const [ input, setInput ] = useState("")
    const navigate = useNavigate();

    const handleOnChange = async e => {
        setInput(e.target.value)
    }

    const handleKeyDown = async e => {
        if (e.key === "Enter") {
            await sellStock()
        }
    }

    const handleClick = async () => {
        await sellStock()
    }

    const sellStock = async () => {
        // if there is a quantity :
        //      total = price * quantity
        //      if quantity is greater than users stocks :
        //              modal pop up "Insufficient stocks."
        //              clear input
        //      else :
        //              addStocks( symbol, name, -quantity )
        //              updateCash( cash + total )
        //              modal pop up "Sale sucessful"
        //              redirect to portfolio page
        if (input) {
            const total = price * input 
            if (input > user.stocks.find(x => x.name === stockToSell.label).number) {
                alert("Insufficient stocks.")
                setInput("")
            } else {
                await addStocks( stockToSell.label, "stock name", -1 * parseInt(input), cookies, setUser)
                await updateCash( user.cash + total, setUser, cookies )
                alert("Sale sucessful.")
                navigate("/portfolio")
                refreshPage() // update user stocks
            }
        }
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    return (
        <>
        <Cont>
            <h4>Sell container. Cash: ${user.cash.toFixed(2)}.</h4>
            {
                stockToSell 
                &&
                <StockCont>
                    <TopCont>
                        <p>Symbol</p>
                        <p>{stockToSell.lebel}</p>
                    </TopCont>
                    <BottomCont>
                        <p>{price}</p>
                        <input type="number" placeholder="Quantity" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input} ></input>
                        <button placeholder="Sell" onClick={handleClick}>Sell</button>
                    </BottomCont>
                </StockCont>
            }
        </Cont>        
        </>
    )
}

export default SellStock

const Cont = styled.div`
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