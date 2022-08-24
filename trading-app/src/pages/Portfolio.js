import React, { useEffect } from "react";
import Navbar from "../components/Navbar"
import PortfolioItem from "../components/PortfolioItem"
import { useState } from "react"
import styled from "styled-components";
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
				user={user}
			/>
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
					<tr>
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
								<p>${user.cash.toFixed(2)}</p>
							}
						</EndBox>
					</tr>
					{/* total row */}
					<tr>
						<TD>
							
						</TD>
						<TD>
							
						</TD>
						<EndBox colour={'#28292e'}>
							Total:
						</EndBox>
						<EndBox colour={'#28292e'}>
							<p>${total.toFixed(2)}</p>
						</EndBox>
					</tr>
					</PortTBody>
				</PortTable>
			</TableCont>
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
`

const TableCont = styled.div`
	display: table;
	padding: auto;
	margin: auto;
	padding-top: 5%;
	width: 40%;
`

const PortTable = styled.thead`
	border-collapse: collapse;
	color: white;

	/* shaun */
	/* box-shadow: 0px 1px 5px white; */
`

const PortTHead = styled.thead`
	background: #31356e !important;
	padding: auto;
`

const TH = styled.th`
	width: 30%;

	/* shaun */
	padding: 1rem 0;
`

const TR = styled.tr`
	text-align: center;
`

const TD = styled.td`
	width: 30%;
	min-width: 70px;
	padding: 1rem;
`

const PortTBody = styled.tbody`
	padding: auto;
	width: 100%;
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