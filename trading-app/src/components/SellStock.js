import { useState } from "react";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { addStocks, updateCash, addHistory } from "../utils";
import Modal from 'react-modal';
import "../Modal.css"
import tick from "../images/tick.png"
import x from "../images/x.png"
const SellStock = ({ price, stockToSell, user, cookies, setUser }) => {

    const [ input, setInput ] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [purchaseSuccesful, setPurchaseSuccesful] = useState(false);
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
        if (input <= 0) {
          setInput("");
          return 
        }
        if (input > user.stocks.find(x => x.name === stockToSell.label).number) {
            isModalOpen();
            return 
        }
        const stocksSold = await addStocks( stockToSell.label, stockToSell.label, -1 * parseFloat(input), cookies, setUser);
        if (stocksSold) {
          const newCash = user.cash + price * parseFloat(input).toFixed(2)
          await updateCash( newCash.toFixed(2) , cookies );
          await addHistory(cookies, stockToSell.label, price, parseFloat(input).toFixed(2), false)
          setPurchaseSuccesful(true);
          isModalOpen();
        }
      };

    const refreshPage = () => {
        window.location.reload(false);
    };

  //MODAL FUNCTIONS
  const closeModalUnsuccessful = () => {
    closeModal();
    setInput("");
  };

  const closeModalSuccessful = () => {
    navigate("/portfolio");
    refreshPage();
  };

  const isModalOpen = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  Modal.setAppElement("#root");

  const customStyles = {
    content: {
      position: 'absolute',
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "350px",
      height: "300px",
      background: "#222224",
      border: '1px solid #5e5def',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.8rem',
      padding: '1rem 1rem'
      
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
  };

    return (
        
        <Cont>
            {
                stockToSell 
                &&
                <StockCont>
                     <h2>{stockToSell.label}</h2>
                     <p>Quantity of stock owned:&nbsp;
                     {user.stocks.find((x) => x.name === stockToSell.label)
                        ? user.stocks.find((x) => x.name === stockToSell.label).number
                        : "None."}
                    </p>
                    <p>Price per stock: ${Math.round(price*100)/100}</p>
                    <BottomCont>
                        <Input type="number" placeholder="Quantity" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input}/>
                        <Button2 placeholder="Sell" onClick={handleClick}>Sell</Button2>
                    </BottomCont>
                </StockCont>
            }
            <Modal
         isOpen={modalOpen}
         style={customStyles}
         closeTimeoutMS={200}
        >
            
            { !purchaseSuccesful
            ?
            <>
            <h1 className="Insufficent">INSUFFICIENT STOCKS</h1>
            <img className="x" src={x} alt="x" />
            <h2 className="valid-ammount">PLEASE ENTER A VALID AMMOUNT</h2>
            <button className="stock-notSold" onClick={closeModalUnsuccessful}>CLOSE</button>
            </>
            :
            <>
            <h1 className="Insufficent">STOCK SOLD</h1>
            <img className="tick" src={tick} alt="tick" />
            <button className="stock-notSold" onClick={closeModalSuccessful}>CLOSE</button>
            </>
            }
            
        </Modal>
        </Cont>        
        
    )
}

export default SellStock

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
`;

const StockCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
  min-height: 150px;
  /* min-width: 200px; */
  padding-bottom: 20px;
`;

const BottomCont = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
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
