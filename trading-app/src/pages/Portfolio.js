import React, { useEffect } from "react";
import Navbar from "../components/Navbar"
import PortfolioItem from "../components/PortfolioItem"
import { useState } from "react"
import styled from "styled-components";
// import { getPrices } from "../utils/stock-prices"
// import { getPrices } from "../utils/finnhub-api"
import { getPrices } from "../utils/finnhub-fetch"

function Portfolio({ setIsLoggedIn, isLoggedIn, user }) {

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
			/>
			<h2>This is the Portfolio Page</h2>
			<TableCont>
				<table>
					<thead>
						<tr>
							<th>
								Stock 
							</th>
							<th>
								Quantity
							</th>
							<th>
								Value per share
							</th>
							<th>
								Total value
							</th>
						</tr>
					</thead>
					<tbody>
					{
						stocks && stocks.length === prices.length 
						&&
						stocks.map( (stock, i) => (
							<PortfolioItem 
								key={i}
								name={stock.symbol} 
								symbol={stock.name} 
								price={prices[i]} 
								number={stock.number}
							/>
						))
					}
					{/* cash row */}
					<tr>
						<td>
						
						</td>
						<td>
							
						</td>
						<td>
							Cash:
						</td>
						<td>
							{
								user
								&&
								user.cash
							}
						</td>
					</tr>
					{/* total row */}
					<tr>
						<td>
							
						</td>
						<td>
							
						</td>
						<td>
							Total:
						</td>
						<td>
							{
								total
								&&
								<p>{total}</p>
							}
		
						</td>
					</tr>
					</tbody>
				</table>
			</TableCont>
		</Cont>
	);
}

export default Portfolio;

const Cont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const TableCont = styled.div`
`