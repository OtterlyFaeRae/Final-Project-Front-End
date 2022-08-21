import { useState } from "react";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { addStocks, updateCash } from "../utils";

const BuyStock = ({ price, stockToBuy, user, cookies, setUser }) => {

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

	const handleClick = async () => {
        // redir()
        await buyStock()
    }

    const redir = () => {
        if (input) {
            navigate("/portfolio")
            alert("Purchase sucessful.")
        }
    }

    const buyStock = async () => {
        // if there is a quantity :
        //      total = price * quantity
        //      if total is greater than cash :
        //              modal pop up "Insufficient funds."
        //              clear input
        //      else :
        //              addStocks( symbol, name, quantity )
        //              updateCash( cash - total )
        //              modal pop up "Purchase sucessful"
        //              redirect to portfolio page
        if (input) {
            const total = price * input
            if (total > user.cash) {
                alert("Insufficient funds.")
                setInput("")
            } else {
                await addStocks( stockToBuy, "stock name", parseInt(input), cookies, setUser)
                await updateCash( user.cash - total, setUser, cookies )
                alert("Purchase sucessful.")
                navigate("/portfolio")
                refreshPage() // update user stocks
            }
            setInput("")
        }

    }

    const refreshPage = () => {
        window.location.reload(false);
      }

    return (
        <BuyCont>
        <h4>Buy container. Cash: ${user.cash}.</h4>
        {
            stockToBuy !== "No stock found."
            ?
            <StockCont>
                <TopCont>
                    <p>Symbol</p>
                    <p>{stockToBuy}</p>
                </TopCont>
                <BottomCont>
                    <p>{price}</p>
                    <input type="number" placeholder="Quantity" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input} ></input>
                    <button onClick={handleClick} placeholder="buy">Buy</button>
                </BottomCont>
            </StockCont>
            :
            <StockNotFoundCont>
                <p>No stock found.</p>
            </StockNotFoundCont>
        }

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
const StockNotFoundCont = styled.div`
    margin: 4rem 7rem;
`