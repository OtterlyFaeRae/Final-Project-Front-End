import React, { useEffect } from "react";
import Navbar from "../components/Navbar"
import PortfolioItem from "../components/PortfolioItem"
import { useState } from "react"
import styled from "styled-components";

function Portfolio({ setIsLoggedIn, isLoggedIn, user }) {

	const [ stocks, setStocks ] = useState([])

	useEffect( () => {
		setStocks(user.stocks)
	}, [user])
	
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
								name={stock[0].name} 
								symbol={stock[0].symbol} 
								price={""} 
								number={stock[0].number}
								key={i}
							/>
						))
					}
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