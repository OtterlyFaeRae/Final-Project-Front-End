import { useState } from "react";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { addStocks, updateCash } from "../utils";
import Modal from 'react-modal';
import "../Modal.css"
const SellStock = ({ price, stockToSell, user, cookies, setUser }) => {

    const [ input, setInput ] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [purchaseSuccesful, setPurchaseSuccesful] = useState(false)
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
                isModalOpen()
            } else {
                await addStocks( stockToSell.label, "stock name", -1 * parseInt(input), cookies, setUser)
                await updateCash( user.cash + total, setUser, cookies )
                setPurchaseSuccesful(true)
                isModalOpen()
                // navigate("/portfolio")
                // refreshPage() // update user stocks
            }
        }
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

        //MODAL FUNCTIONS
        const closeModalUnsuccessful = () => {
            closeModal()
            setInput("")
        }
    
        const closeModalSuccessful = () => {
            navigate("/portfolio")
            refreshPage()
        }
    
        const isModalOpen = () => {
            setModalOpen(true)
        }
    
        const closeModal = () => {
            setModalOpen(false)
        }
    
        Modal.setAppElement('#root');
    
        const customStyles = {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: "auto",
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              background: "#222224"
            },
        };

    return (
        <>
        <Cont>
            {
                stockToSell 
                &&
                <StockCont>
                    <TopCont>
                        <TopSubCont>
                            <SymbolCont>
                                <p>Symbol:</p>
                                <SymbolBox>{stockToSell.label}</SymbolBox>
                            </SymbolCont>
                            <OwnedStockBox>
                                <p>Your stocks:</p>
                                <p>{user.stocks.find(x => x.name === stockToSell.label).number}</p>
                            </OwnedStockBox>
                        </TopSubCont>
                            <ValBox>
                                <h2>${Math.round(price*100)/100}</h2>
                            </ValBox>
                    </TopCont>
                    <BottomCont>
                        <label>
                            Number: 
                            <Input type="number" placeholder="Quantity" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input}/>
                        </label>
                        <button placeholder="Sell" onClick={handleClick}>Sell</button>
                    </BottomCont>
                </StockCont>
            }
            <Modal
         isOpen={modalOpen}
         style={customStyles}
         closeTimeoutMS={200}

        //  onAfterOpen={afterOpenModal}
        >
            <div>
            
            { !purchaseSuccesful
            ?
            <div>
            <h1 className="Insufficent">INSUFFICIENT STOCKS</h1>
            <h2 className="valid-ammount">PLEASE ENTER A VALID AMMOUNT</h2>
            <button className="closeUnsuccessful" onClick={closeModalUnsuccessful}>CLOSE</button>
            </div>
            :
            <div>
            <h1 className="Insufficent">STOCK SOLD</h1>
            <button className="closeSuccessful" onClick={closeModalSuccessful}>CLOSE</button>
            </div>
            }
            </div>
            
        </Modal>
        </Cont>        
        </>
    )
}

export default SellStock

const Cont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
const StockCont = styled.div`
	display: flex;
    flex-direction: column;
    border: 2px solid #31356E;
    background: black;
    min-height: 100px;
    min-width: 300px;
    padding-top: 1%;
    padding-left: 1%;
    padding-right: 1%;
`

const TopCont = styled.div`
    display:flex;
    padding-bottom: 30px;
`

const TopSubCont = styled.div`
    display:flex;
    flex-direction: column; 
`

const SymbolCont = styled.div`
	display: flex;
    padding-bottom: 10px;
`

const OwnedStockBox = styled.div`
    display:flex;
`

const ValBox = styled.div`
    padding-left: 25%;
`

const SymbolBox = styled.p`
    padding-left: 5px;
`

const BottomCont = styled.div`
	display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`

const Input = styled.input`
    margin-left: 20%;
    width: 15%;
`