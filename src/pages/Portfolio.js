import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PortfolioItem from "../components/PortfolioItem";
import styled from "styled-components";
import background from "../components/images/stocks3.jpg";
import { getPrices } from "../utils/stocks";

const Portfolio = ({ setIsLoggedIn, isLoggedIn, user, logOut }) => {
  const [stocks, setStocks] = useState([]);
  const [prices, setPrices] = useState("prices");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user) {
      setStocks(user.stocks);
    }
  }, [user]);

  const getPortfolioPrices = async () => {
    const stockSymbols = stocks.map((x) => x.name);
    const result = await getPrices(stockSymbols);
    setPrices(result);
  };

  useEffect(() => {
    getPortfolioPrices();
    // eslint-disable-next-line
  }, [stocks]);

  const getTotal = () => {
    const totalPrices = stocks.map((stock, i) => stocks[i].number * prices[i]);
    const stockTotals = totalPrices.reduce((prev, curr) => prev + curr, 0);
    const result = user.cash + stockTotals;
    setTotal(result);
  };

  useEffect(() => {
    getTotal();
    // eslint-disable-next-line
  }, [prices]);

  return (
    <Cont background={background}>
      <Navbar
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        logOut={logOut}
        user={user}
      />
      <Content>
        <Background background={background}></Background>
        <Title>Portfolio</Title>
        <TableCont>
          <PortTable>
            <PortTHead>
              <TR>
                <TH style={{ borderTopLeftRadius: "4px" }}>Stock</TH>
                <TH>Quantity</TH>
                <THTarget>Value per Share</THTarget>
                <TH style={{ borderTopRightRadius: "4px" }}>Total Value</TH>
              </TR>
            </PortTHead>
            <PortTBody>
              {stocks.map((stock, i) => (
                <PortfolioItem
                  key={i}
                  index={i}
                  name={stock.symbol}
                  symbol={stock.name}
                  price={prices[i]}
                  number={stock.number}
                />
              ))}
              <TR>
                <TD></TD>
                <TDTarget></TDTarget>
                <EndBox className={"cash-row"} colour={"#222224"}>
                  Cash:
                </EndBox>
                <EndBox className={"cash-row"} colour={"#222224"}>
                  ${total ? user.cash.toFixed(2) : null}
                </EndBox>
              </TR>
              <TR>
                <TD></TD>
                <TDTarget></TDTarget>
                <EndBox
                  className={"total-row"}
                  colour={"#28292e"}
                  style={{ borderBottomLeftRadius: "4px" }}
                >
                  Total:
                </EndBox>
                <EndBox
                  className={"total-row"}
                  colour={"#28292e"}
                  style={{ borderBottomRightRadius: "4px" }}
                >
                  ${total ? total.toFixed(2) : null}
                </EndBox>
              </TR>
            </PortTBody>
          </PortTable>
        </TableCont>
      </Content>
    </Cont>
  );
};

export default Portfolio;

const Title = styled.h2`
  /* padding-top: 5%; */
`;

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
const Background = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-radius: 10px;
  border: solid;
  background-color: #212121;
  border-color: #5e5df0;
  border-width: 1.5px;
  opacity: 1;
  gap: 40px;
  margin-bottom: 20px;
  width: 75vw;
  max-width: 600px;
  @media (max-width: 450px) {
    width: 85vw;
  }
  @media (max-width: 768px) {
    gap: 20px;
  } ;
`;

const TableCont = styled.div`
  display: table;
  width: 100%;
  padding: 1rem;
  margin-bottom: 20px;
`;

const PortTable = styled.table`
  border-collapse: collapse;
  color: white;
  width: 100%;
  font-size: clamp(12px, 3vw, 16px);
`;

const PortTHead = styled.thead`
  background: #5e5df0;
`;

const TH = styled.th`
  padding: 15px 0;
`;
const THTarget = styled.th`
  min-width: 150px;
  padding: 15px 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

const TR = styled.tr`
  text-align: center;
  &:hover > .cash-row {
    background-color: #31356e;
  }
  &:hover > .total-row {
    background-color: #31356e;
  }
`;

const TD = styled.td`
  min-width: 70px;
`;
const TDTarget = styled.td`
  min-width: 70px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PortTBody = styled.tbody`
  text-align: center;
`;

const EndBox = styled.td`
  background: ${(props) => props.colour};
  min-width: 70px;
  padding: 0.6rem 0;
  &:hover {
    background-color: #31356e;
    cursor: pointer;
  }
`;
