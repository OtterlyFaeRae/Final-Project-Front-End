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
			<TableCont>
				<PortTable>
					<PortTHead>
						<TR>
                            <TH>
								Transaction 
							</TH>
							<TH>
								Stock 
							</TH>
                            <TH>
								Timestamp
							</TH>
							<TH>
								Value/Share
							</TH>
							<TH>
								Quantity
							</TH>
							<TH>
								Total Value
							</TH>
						</TR>
					</PortTHead>
					<PortTBody>
					{
                        user
                        ?
						user.history.map( (item, i) => (
                            <tr key={i}>
                                <td>
                                    {item.buy ? "buy" : "sell"}
                                </td>
                                <td>
                                    {item.symbol}
                                </td>
                                <td>
                                    {item.timeStamp}
                                </td>
                                <td>
                                    {item.price}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    {item.total}
                                </td>
                            </tr>
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
	gap: 3em;
	height: 100vh;
	background-image: url(${props => props.background});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	gap: 100px;
`

const Content = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 20px;
padding-bottom: 100px;
padding-right: 100px;
padding-left: 100px;
border-radius: 10px;
border: solid;
background-color: #212121;
border-color: #5E5DF0;
border-width: 1.5px;
opacity: 1;
gap: 40px;
max-width: 75%;
`

const TableCont = styled.div`
	display: table;
`

const PortTable = styled.table`
	border-collapse: collapse;
	color: white;
	/* shaun */
	/* box-shadow: 0px 1px 5px white; */
`

const PortTHead = styled.thead`
	background: #5e5df0;
	padding: auto;
`

const TH = styled.th`
	min-width: 150px;

	/* shaun */

	padding: 15px;
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

const TD = styled.td`
	min-width: 70px;
`

const PortTBody = styled.tbody`
	text-align: center;
`

const EndBox = styled.td`
	background: ${props => props.colour};
	width: 30%;
	min-width: 70px;

	/* shaun */
	padding: 0.6rem 2rem;

    /* shaun */
    &:hover {
		background-color: #31356e;
        cursor: pointer;
	}
`