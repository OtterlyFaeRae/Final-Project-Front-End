import { useState } from "react";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { addStocks, updateCash } from "../utils";
import Modal from 'react-modal';

const BuyStock = ({ price, stockToBuy, user, cookies, setUser }) => {

    const [ input, setInput ] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [purchaseSuccesful, setPurchaseSuccesful] = useState(false)

    const navigate = useNavigate();

    const handleOnChange = async e => {
        setInput(e.target.value)
    }

    const handleKeyDown = async e => {
        if (e.key === "Enter") {
            await buyStock()
        }
    }

	const handleClick = async () => {
        await buyStock()
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
                isModalOpen();
            } else {
                await addStocks( stockToBuy, "stock name", parseInt(input), cookies, setUser)
                await updateCash( user.cash - total, setUser, cookies )
                setPurchaseSuccesful(true)
                isModalOpen()
                // navigate("/portfolio")
                // refreshPage() // update user stocks
            }
            setInput("")
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
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Cont>
        {
            stockToBuy !== "No stock found."
            ?
            <StockCont>
                <TopCont>
                        <TopSubCont>
                            <SymbolCont>
                                <p>Symbol:</p>
                                <SymbolBox>{stockToBuy}</SymbolBox>
                            </SymbolCont>
                            <OwnedStockBox>
                                <p>Your stocks:</p>
                                <p>{user.stocks.find(x => x.name === stockToBuy).number}</p>
                            </OwnedStockBox>
                        </TopSubCont>
                            <ValBox>
                                <h2>${Math.round(price*100)/100}</h2>
                            </ValBox>
                    </TopCont>
                <BottomCont>
                    <input type="number" placeholder="Quantity" onKeyDown={handleKeyDown} onChange={handleOnChange} value={input} />
                    <button onClick={handleClick} placeholder="buy">Buy</button>
                </BottomCont>
            </StockCont>
            :
            <StockNotFoundCont>
                <p>No stock found.</p>
            </StockNotFoundCont>
        }

        <Modal
            isOpen={modalOpen}
            style={customStyles}

        //  onAfterOpen={afterOpenModal}
        >
            <div>
            
            { !purchaseSuccesful
            ?
            <div>
            <button onClick={closeModalUnsuccessful}>CLOSE</button>
            <h1>INSUFFICENT FUNDS</h1>
            </div>
            :
            <div>
            <button onClick={closeModalSuccessful}>CLOSE</button>
            <h1>Purchase successful</h1>
            </div>
            }
            </div>
            
        </Modal>

    </Cont>
    )
}

export default BuyStock

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
    min-height: 150px;
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

const SymbolBox = styled.p`
    padding-left: 5px;
`

const OwnedStockBox = styled.div`
    display:flex;
`

const ValBox = styled.div`
    padding-left: 25%;
`

const BottomCont = styled.div`
	display: flex;
`
const StockNotFoundCont = styled.div`
    margin: 4rem 7rem;
`