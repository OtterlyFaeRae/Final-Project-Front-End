import Navbar from "../components/Navbar"
import styled from "styled-components";
import background from "../images/stocks3.jpg"

const History = ({ setIsLoggedIn, isLoggedIn, user, logOut }) => {
    return (
		<Cont background={background}>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
				logOut={logOut}
				user={user}
			/>
			<Content>
			<Title>Transaction History</Title>
			<Background background={background}></Background>
			<TableCont>
				<PortTable>
					<PortTHead>
						<TR>
                            <TH style={{ borderTopLeftRadius: "4px"}}>
								Transaction 
							</TH>
							<TH>
								Stock 
							</TH>
                            <THTargetSecond>
								Timestamp
							</THTargetSecond>
							<THTragetFirst>
								Value/Share
							</THTragetFirst>
							<TH>
								Quantity
							</TH>
							<TH style={{ borderTopRightRadius: "4px"}}>
								Total Value
							</TH>
						</TR>
					</PortTHead>
					<PortTBody>
					{
                        user
                        ?
						user.history.map( (item, i) => (
                            <StyledRow key={i} index={i}>
                                <TD>
                                    {item.buy ? "buy" : "sell"}
                                </TD>
                                <TD>
                                    {item.symbol}
                                </TD>
                                <TDTargetSecond>
                                    {item.timeStamp}
                                </TDTargetSecond>
                                <TDTargetFirst>
                                    ${item.price}
                                </TDTargetFirst>
                                <TD>
                                    {item.quantity}
                                </TD>
                                <TD>
                                    ${item.total}
                                </TD>
                            </StyledRow>
						))
						:
						null
					}
					</PortTBody>
				</PortTable>
			</TableCont>
			</Content>
		</Cont>
    )
}

export default History


const Title = styled.h2`
	padding-top: 5%;
`

const Cont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	background-image: url(${props => props.background});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	gap: 100px;
	@media (max-width: 768px) {
		gap: 50px;
	} 
`
const Background = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	background-image: url(${props => props.background});
	z-index: -1;
	background-size: cover;
`
const Content = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 20px;
/* padding-bottom: 100px; */
/* padding-right: 100px;
padding-left: 100px; */
border-radius: 10px;
border: solid;
background-color: #212121;
border-color: #5E5DF0;
border-width: 1.5px;
opacity: 1;
gap: 40px;
width: 75vw;
margin-bottom: 10px;
max-width: 800px;
@media (max-width: 450px) {
	width: 85vw;
};
@media (max-width: 768px) {
	gap: 20px;
};
`

const TableCont = styled.div`
	display: table;
	width: 100%;
	padding: 1rem;
`

const PortTable = styled.table`
	border-collapse: collapse;
	color: white;
	width: 100%;
	font-size: clamp(12px, 3vw, 16px);
`

const PortTHead = styled.thead`
	background: #5e5df0;
	padding: auto;
`

const TH = styled.th`
	min-width: 70px;
	padding: 15px 0;
`
const THTragetFirst = styled.th`
	min-width: 70px;
	padding: 15px 0;
	@media (max-width: 820px) {
      display: none;
  	} 
`
const THTargetSecond = styled.th`
	min-width: 70px;
	padding: 15px 0;
	@media (max-width: 670px) {
      display: none;
  	} 
`
const TR = styled.tr`
	text-align: center;
	&:hover > .cash-row {
		background-color: #31356e;
	}
	&:hover > .total-row {
		background-color: #31356e;
	}
`
const StyledRow = styled.tr`
    ${props => props.index % 2 === 1 ? 'background-color: #222224; ' : 'background-color: #28292e;'};
    &:hover {
		background-color: #31356e;
        cursor: pointer;
	}
`
const TD = styled.td`
	min-width: 70px;
	padding: 0.6rem 0;
`
const TDTargetFirst = styled.td`
	min-width: 70px;
	@media (max-width: 820px) {
      display: none;
  	} 
`
const TDTargetSecond = styled.td`
	min-width: 70px;
	@media (max-width: 670px) {
      display: none;
  	} 
`
const PortTBody = styled.tbody`
	text-align: center;
`
