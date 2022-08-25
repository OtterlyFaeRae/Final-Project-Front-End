import { useState } from "react";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { addStocks, updateCash } from "../utils";

const SellStock = ({ price, stockToSell, user, cookies, setUser }) => {

    const [ input, setInput ] = useState("");
    const navigate = useNavigate();

    const handleOnChange = async e => {
        setInput(e.target.value);
    };

    const handleKeyDown = async e => {
        if (e.key === "Enter") {
            await sellStock();
        };
    };

    const handleClick = async () => {
        await sellStock();
    };

    const sellStock = async () => {
        if (input > 0) {
            const total = price * input 
            if (input > user.stocks.find(x => x.name === stockToSell.label).number) {
                alert("Insufficient stocks.");
            } else {
                await addStocks( stockToSell.label, "stock name", -1 * parseFloat(input), cookies, setUser);
                await updateCash( user.cash + total, setUser, cookies );
                alert("Sale sucessful.");
                navigate("/portfolio");
                refreshPage(); // update user stocks
            };
        };
        setInput("");
    };

    const refreshPage = () => {
        window.location.reload(false);
    };

    return (
        
        <Cont>
            {
                stockToSell 
                &&
                <StockCont>
                     <h2>{stockToSell.label}</h2>
                     <p>Quantity of stock owned:&nbsp;
                            {user.stocks.find(x => x.name === stockToSell) ?  user.stocks.find(x => x.name === stockToSell).number : 'None.'}
                    </p>
                    <p>Price per stock: ${Math.round(price*100)/100}</p>
                    <BottomCont>
                        <Input type="number" placeholder="Quantity" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input}/>
                        <Button2 placeholder="Sell" onClick={handleClick}>Sell</Button2>
                    </BottomCont>
                </StockCont>
            }
        </Cont>        
        
    )
}

export default SellStock

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StockCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
  min-height: 150px;
  min-width: 200px;
  padding-bottom: 20px;
`;

const BottomCont = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
min-width: 400px;
gap: 20px;
`;

const Button2 = styled.button`
  background: #5e5df0;
  margin-top: 5px;
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
`

const Input = styled.input`
  border-style: solid;
  border-color: white;
  border-width: 1px;
  background-color: #212121;
  border-radius: 5px;
  padding: 5px;
  font-size: 20px;
  outline: none;
  caret-color: white;
  color: white;
  max-width: 120px;
  margin-top: 7px;
  &:focus {
    border-color: #5e5df0;
  }
`;