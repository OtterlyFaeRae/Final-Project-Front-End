import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { addStocks, updateCash } from "../utils";
import Modal from "react-modal";
import "../Modal.css";
import noMoney from "../images/no money.png";
import yesMoney from "../images/cashInHand.png";

const BuyStock = ({ price, stockToBuy, user, cookies, setUser }) => {
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [purchaseSuccesful, setPurchaseSuccesful] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = async (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await buyStock();
      if (price[0] === 0) {
        alert("Error. No stock found.")
      }
    }
  };

  const handleClick = async () => {
    await buyStock();
    if (price[0] === 0) {
      alert("Error. No stock found.")
    }
  };

  const buyStock = async () => {
    if (input > 0 && price > 0) {
      const total = price * input;
      if (total > user.cash) {
        isModalOpen();
      } else {
        await addStocks(
          stockToBuy,
          "stock name",
          parseInt(input),
          cookies,
          setUser
        );
        await updateCash(user.cash - total, setUser, cookies);
        setPurchaseSuccesful(true);
        isModalOpen();
      }
    }
    setInput("");
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
         closeTimeoutMS={200}

        //  onAfterOpen={afterOpenModal}
        >
            <div>
            
            { !purchaseSuccesful ? (
            
            <div>
            <h1 className="Insufficent">INSUFFICIENT FUNDS</h1>
            <img className="noMoney" src={noMoney} />
            <h2 className="valid-ammount">PLEASE ENTER A VALID AMMOUNT</h2>
            <button className="closeUnsuccessful" onClick={closeModalUnsuccessful}
            >
                CLOSE</button>
            </div>
          ) : (
            <div>
              <h1 className="Insufficent">PURCHASE SUCCESSFUL</h1>

              <img className="yesMoney" src={yesMoney} alt="" />

              <button
                className="closeSuccessful"
                onClick={closeModalSuccessful}
              >
                CLOSE
              </button>
            </div>
          )}
          ;
        </div>
      </Modal>
    </Cont>
  );
};

export default BuyStock;

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
  min-width: 300px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 50px;
`;

const BottomCont = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
min-width: 400px;
gap: 20px;
`;

const StockNotFoundCont = styled.div`
  margin: 4rem 7rem;
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