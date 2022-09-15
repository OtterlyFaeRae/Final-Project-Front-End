import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import BuyStock from "../components/BuyStock";
import { getPrices } from "../utils/stocks";
import background from "../components/images/stocks3.jpg";

const Buy = ({ setIsLoggedIn, isLoggedIn, user, cookies, setUser, logOut }) => {
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
          <P>
            At the moment we only support searching by stock symbol.{" "}
            <Terms
              href="https://www.nyse.com/listings_directory/stock"
              target="_blank"
              rel="noopener noreferrer"
            >
              View stock symbols.
            </Terms>
          </P>
        </div>
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
};

export default Buy;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3em;
  min-height: 100vh;
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
  width: 75vw;
  max-width: 600px;
  padding: 50px 1rem 2rem 1rem;
  border-radius: 10px;
  border: solid;
  background-color: #212121;
  border-color: #5e5df0;
  border-width: 1.5px;
  opacity: 1;
  gap: 20px;
  margin-bottom: 20px;
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
  margin-top: 7px;
  margin-right: 1rem;
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
  @media (max-width: 600px) {
    margin-right: 0.5rem;
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
  padding: 8px 28px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  border: 0;
  @media (max-width: 500px) {
    padding: 8px 20px;
  }
`;

const Terms = styled.a`
  font-weight: bold;
  color: #5e5df0;
  display: inline-block;
  position: relative;
  padding-bottom: 7px;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #5e5df0;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
const P = styled.p`
  text-align: center;
  padding: 1rem 3rem;
  line-height: normal;
  @media (max-width: 700px) {
    padding: 0.5rem 1rem;
    font-size: small;
  } ;
`;
