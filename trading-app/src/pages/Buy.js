import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import BuyStock from "../components/BuyStock";
import { getPrices } from "../utils/finnhub-fetch";
import background from "../images/stocks3.jpg";

function Buy({ setIsLoggedIn, isLoggedIn, user, cookies, setUser, logOut }) {
  const [input, setInput] = useState("");
  const [stockToBuy, SetStockToBuy] = useState("");
  const [price, setPrice] = useState("");

  const handleOnChange = async (e) => {
    setInput(e.target.value.toUpperCase());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input) {
      searchStock();
    }
  };

  const handleClickSearch = async () => {
    if (input) {
      searchStock();
    }
  };

  const searchStock = async () => {
    const buyPrice = await getPrices([input]);
    SetStockToBuy(() => input);
    if (!buyPrice) {
      SetStockToBuy(() => "No stock found.");
    }
    setPrice(buyPrice);
    setInput("");
  };

  return (
    <Cont background={background}>
      <Navbar
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        logOut={logOut}
        user={user}
      />
      <Content>
        <h2>Buy Stocks</h2>
        <p>Your Cash: ${user && user.cash.toFixed(2)}</p>
        <SearchCont>
          <Input
            type="text"
            placeholder="Search stocks..."
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
            value={input}
          ></Input>
          <SearchButton onClick={handleClickSearch}>Search</SearchButton>
        </SearchCont>
        {stockToBuy && (
          <BuyStock
            price={price}
            stockToBuy={stockToBuy}
            user={user}
            cookies={cookies}
            setUser={setUser}
          />
        )}
      </Content>
    </Cont>
  );
}

export default Buy;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3em;
  height: 100vh;
  background-image: url(${(props) => props.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  gap: 100px;
  @media (max-width: 768px) {
		gap: 50px;
	} 
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 75vw;
  max-width: 600px;
  /* padding-right: 100px;
  padding-left: 100px; */
  padding: 50px 1rem 50px 1rem;
  border-radius: 10px;
  border: solid;
  background-color: #212121;
  border-color: #5e5df0;
  border-width: 1.5px;
  opacity: 1;
  gap: 20px;
  /* max-width: 75%; */
  @media (max-width: 450px) {
      width: 85vw;
  	}
`;

const SearchCont = styled.div`
  margin-top: 2rem;
display: flex;
justify-content: space-evenly;
align-items: center;
width: 100%;
max-width: 400px;
/* @media (max-width: 768px) {
      flex-direction: column;
  	} */
`;

const Input = styled.input`
  width: 70%;
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
  /* max-width: 220px; */
  margin-top: 7px;
  margin-right: 1.5rem;
  text-transform: uppercase;
  &:focus {
    border-color: #5e5df0;
  }
  ::-webkit-input-placeholder {
   text-transform: initial;
}

:-moz-placeholder { 
   text-transform: initial;
}

::-moz-placeholder {  
   text-transform: initial;
}

:-ms-input-placeholder { 
   text-transform: initial;
}
@media (max-width: 400px) {
    margin-right: 1rem;
  	}
`;

const SearchButton = styled.button`
  width: 30%;
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
  /* padding: 8px 28px; */
  padding: 8px 28px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  border: 0;
  @media (max-width: 450px) {
    padding: 8px 12px;
  	}
`;
