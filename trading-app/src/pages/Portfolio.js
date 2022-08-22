import React, { useEffect } from "react";
import Navbar from "../components/Navbar"
import PortfolioItem from "../components/PortfolioItem"
import { useState } from "react"
import styled from "styled-components";
import { getPrices } from "../utils/stock-prices"
// import { getPrices } from "../utils/finnhub-api"

function Portfolio({ setIsLoggedIn, isLoggedIn, user }) {

	const [ stocks, setStocks ] = useState([])
	const [ prices, setPrices ] = useState("prices")

	useEffect( () => {
		setStocks(user.stocks)
	}, [user])

	useEffect( () => {
		// getPortfolioPrices()
	}, [])

	const getPortfolioPrices = async () => {
		const result = await getPrices(["AAPL", "GOOGL"])
		setPrices(result)
	}
	
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
								name 
							</th>
							<th>
								symbol
							</th>
							<th>
								quantity
							</th>
							<th>
								price
							</th>
						</tr>
					</thead>
					<tbody>
					{
						stocks
						&&
						stocks.map( (stock, i) => (
							<PortfolioItem 
								key={i}
								name={stock.symbol} 
								symbol={stock.name} 
								price={""} 
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
							{user.cash}
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