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
        <h4>Buy container. Cash: ${user.cash.toFixed(2)}.</h4>
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