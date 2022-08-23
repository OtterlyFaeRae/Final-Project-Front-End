import React, { useEffect } from "react";
import Navbar from "../components/Navbar"
import PortfolioItem from "../components/PortfolioItem"
import { useState } from "react"
import styled from "styled-components";
// import { getPrices } from "../utils/stock-prices"
// import { getPrices } from "../utils/finnhub-api"
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

	useEffect( () => {
		getPortfolioPrices()
	}, [stocks])

	const getPortfolioPrices = async () => {
		const stockSymbols = stocks.map( x => x.name )
		const result = await getPrices(stockSymbols)
		setPrices(result)
	}

	const getTotal = () => {
		// map though prices and stocks and make a new array of totals 
		// use reduce to sum the array
		// add users cash
		const totalPrices = stocks.map( (stock, i) => 
			stocks[i].number * prices[i]
		)
		const stockTotals =  totalPrices.reduce( (prev, curr) => prev + curr, 0)
		const result = user.cash + stockTotals
		setTotal(result)
	}

	useEffect( () => {
		getTotal()
	}, [prices])
	
	return (
		<Cont>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
				logOut={logOut}
			/>
			<h2>This is the Portfolio Page</h2>
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
							<TH>
								Value per share
							</TH>
							<TH>
								Total value
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
					{/* cash row */}
					<CashRow>
						<TD>
						
						</TD>
						<TD>
							
						</TD>
						<EndBox colour={'#222224'}>
							Cash:
						</EndBox>
						<EndBox colour={'#222224'}>
							{
								user
								&&
								user.cash.toFixed(2)
							}
						</EndBox>
					</CashRow>
					{/* total row */}
					<TotalRow>
						<TD>
							
						</TD>
						<TD>
							
						</TD>
						<EndBox colour={'#28292e'}>
							Total:
						</EndBox>
						<EndBox colour={'#28292e'}>
							<p>{total}</p>
						</EndBox>
					</TotalRow>
					</PortTBody>
				</PortTable>
			</TableCont>
		</Cont>
	);
}

export default Portfolio;

const Cont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: auto;
`

const TableCont = styled.div`
	display: table;
	padding: auto;
	align-content: center;
	width: 40%;
`

const PortTable = styled.thead`
	border-collapse: collapse;
	color: white;
`

const PortTHead = styled.thead`
	background: #31356e;
	padding: auto;
`

const TH = styled.th`
	width: 30%;
`

const TR = styled.tr`

	text-align: center;
`

const TD = styled.td`
	width: 30%;
	padding: 1rem;
`

const PortTBody = styled.tbody`
	padding: auto;
	width: 100%;
	text-align: center;
`

const TotalRow = styled.tr`
`
const CashRow = styled.tr`
`

const EndBox = styled.td`
	background: ${props => props.colour};
	width: 10%;
`