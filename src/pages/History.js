import Navbar from "../components/Navbar";
import styled from "styled-components";
import background from "../components/images/stocks3.jpg";

const History = ({ setIsLoggedIn, isLoggedIn, user, logOut }) => {
  return (
    <Background background={background}>
      <Cont background={background}>
        <Navbar
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          logOut={logOut}
          user={user}
        />
        <Content>
          <Title>Transaction History</Title>
          <TableCont>
            <PortTable>
              <PortTHead>
                <TR>
                  <TH style={{ borderTopLeftRadius: "4px" }}>Transaction</TH>
                  <TH>Stock</TH>
                  <THTargetSecond>Timestamp</THTargetSecond>
                  <THRespondFirst>Value/Share</THRespondFirst>
                  <TH>Quantity</TH>
                  <TH style={{ borderTopRightRadius: "4px" }}>Total Value</TH>
                </TR>
              </PortTHead>
              <PortTBody>
                {user
                  ? user.history.map((stock, i) => (
                      <StyledRow key={i} index={i} buy={stock.buy}>
                        <TD>{stock.buy ? "buy" : "sell"}</TD>
                        <TD>{stock.symbol}</TD>
                        <TDRespondSecond>{stock.timeStamp}</TDRespondSecond>
                        <TDTargetFirst>${stock.price}</TDTargetFirst>
                        <TD>{stock.quantity}</TD>
                        <TotalCell>${stock.total}</TotalCell>
                      </StyledRow>
                    ))
                  : null}
              </PortTBody>
            </PortTable>
          </TableCont>
        </Content>
      </Cont>
    </Background>
  );
};

export default History;

const Title = styled.h2`
  padding-top: 5%;
`;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: url(${(props) => props.background});
  background-position: top;
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
  padding-top: 50px;
  border-radius: 10px;
  border: solid;
  background-color: #212121;
  border-color: #5e5df0;
  border-width: 1.5px;
  opacity: 1;
  gap: 40px;
  width: 75vw;
  margin-bottom: 20px;
  max-width: 800px;
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
`;
const PortTable = styled.table`
  border-collapse: collapse;
  color: white;
  width: 100%;
  font-size: clamp(12px, 3vw, 16px);
  margin-bottom: 20px;
`;
const PortTHead = styled.thead`
  background: #5e5df0;
  padding: auto;
`;
const TH = styled.th`
  min-width: 70px;
  padding: 15px 0;
`;
const THRespondFirst = styled.th`
  min-width: 70px;
  padding: 15px 0;
  @media (max-width: 820px) {
    display: none;
  }
`;
const THTargetSecond = styled.th`
  min-width: 70px;
  padding: 15px 0;
  @media (max-width: 670px) {
    display: none;
  }
`;
const TR = styled.tr`
  text-align: center;
`;
const TotalCell = styled.td`
  min-width: 70px;
  padding: 0.6rem 0;
`;
const StyledRow = styled.tr`
  ${(props) =>
    props.index % 2 === 1
      ? "background-color: #222224; "
      : "background-color: #28292e;"};
  &:hover {
    background-color: #31356e;
    cursor: pointer;
  }
  &:hover ${TotalCell} {
    color: ${(props) => (props.buy ? "green" : "red")};
  }
`;
const TD = styled.td`
  min-width: 70px;
  padding: 0.6rem 0;
`;
const TDTargetFirst = styled.td`
  min-width: 70px;
  @media (max-width: 820px) {
    display: none;
  }
`;
const TDRespondSecond = styled.td`
  min-width: 70px;
  @media (max-width: 670px) {
    display: none;
  }
`;
const PortTBody = styled.tbody`
  text-align: center;
`;
