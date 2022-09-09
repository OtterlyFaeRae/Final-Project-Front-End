import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import PortfolioItem from "../components/PortfolioItem"
import styled from "styled-components";
import background from "../images/stocks3.jpg"
import { getPrices } from "../utils/finnhub-fetch"

function Portfolio({ setIsLoggedIn, isLoggedIn, user, logOut }) {

	const [ stocks, setStocks ] = useState([])
	const [ prices, setPrices ] = useState("prices")
	const [ total, setTotal ] = useState(0)

	useEffect( () => {
		if (user) {
			setStocks(user.stocks)
		}
	}, [user])

	const getPortfolioPrices = async () => {
		const stockSymbols = stocks.map( x => x.name )
		const result = await getPrices(stockSymbols)
		setPrices(result)
	}

	useEffect( () => {
		getPortfolioPrices()
		// eslint-disable-next-line
	}, [stocks])

	const getTotal = () => {
		const totalPrices = stocks.map( (stock, i) => 
			stocks[i].number * prices[i]
		)
		const stockTotals =  totalPrices.reduce( (prev, curr) => prev + curr, 0)
		const result = user.cash + stockTotals
		setTotal(result)
	}

	useEffect( () => {
		getTotal()
		// eslint-disable-next-line
	}, [prices])
	
	return (
		<Cont background={background}>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
				logOut={logOut}
				user={user}
			/>
			<Content>
			<Title>Portfolio</Title>
			<TableCont>
				<PortTable>
					<PortTHead>
						<TR>
							<TH>
								Stock 
							</TH>
							<TH>
								Quantity
							</TH>
							<THTarget>
								Value per Share
							</THTarget>
							<TH>
								Total Value
							</TH>
						</TR>
					</PortTHead>
					<PortTBody>
					{
						stocks.map( (stock, i) => (
							<PortfolioItem 
								key={i}
								index={i}
								name={stock.symbol} 
								symbol={stock.name} 
								price={prices[i]} 
								number={stock.number}
							/>
						))
					}
					<TR>
						<TD>
						
						</TD>
						<TDTarget>
							
						</TDTarget>
						<EndBox className={"cash-row"} colour={'#222224'}>
							Cash:
						</EndBox>
						<EndBox className={"cash-row"} colour={'#222224'}>
							${total ? user.cash.toFixed(2) : null}
						</EndBox>
					</TR>
					<TR>
						<TD>
							
						</TD>
						<TDTarget>
							
						</TDTarget>
						<EndBox className={"total-row"} colour={'#28292e'}>
							Total:
						</EndBox>
						<EndBox className={"total-row"} colour={'#28292e'}>
							${total ? total.toFixed(2) : null}
						</EndBox>
					</TR>
					</PortTBody>
				</PortTable>
			</TableCont>
			</Content>
		</Cont>
	);
}

export default Portfolio;

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
/* padding-top: 20px;
padding-bottom: 100px;
padding-right: 100px;
padding-left: 100px; */
border-radius: 10px;
border: solid;
background-color: #212121;
border-color: #5E5DF0;
border-width: 1.5px;
opacity: 1;
gap: 40px;
/* max-width: 75%; */
width: 75vw;
  max-width: 600px;
  @media (max-width: 450px) {
      width: 85vw;
  	} 
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
`

const PortTHead = styled.thead`
	background: #5e5df0;
`

const TH = styled.th`
	/* min-width: 130px; */

	padding: 15px 0;
`
const THTarget = styled.th`
	min-width: 150px;
	padding: 15px 0;
	@media (max-width: 768px) {
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

const TD = styled.td`
	min-width: 70px;
`
const TDTarget = styled.td`
	min-width: 70px;
	@media (max-width: 768px) {
    display: none;
	}
`

const PortTBody = styled.tbody`
	text-align: center;
`

const EndBox = styled.td`
	background: ${props => props.colour};
	min-width: 70px;

	/* shaun */
	padding: 0.6rem 0;

    /* shaun */
    &:hover {
		background-color: #31356e;
        cursor: pointer;
	}
`