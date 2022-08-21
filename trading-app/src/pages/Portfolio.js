import React, { useEffect } from "react";
import Navbar from "../components/Navbar"
import PortfolioItem from "../components/PortfolioItem"
import { useState } from "react"
import styled from "styled-components";

function Portfolio({ setIsLoggedIn, isLoggedIn, user }) {

	const [ stocks, setStocks ] = useState([])
	const [ prices, setPrices ] = useState([])

	useEffect( () => {
		setStocks(user.stocks)
	}, [user])

	useEffect( () => {
		// setPrices( stockPrices )
	}, [])

	const getPortfolioPrices = async () => {
		return
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
								price
							</th>
							<th>
								quantity
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
`
const TableCont = styled.div`

`