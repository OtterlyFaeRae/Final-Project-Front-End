import React, { useEffect } from "react";
import Navbar from "../components/Navbar"
import PortfolioItem from "../components/PortfolioItem"
import { useState } from "react"

function Portfolio({ setIsLoggedIn, isLoggedIn, user }) {

	const [ stocks, setStocks ] = useState([])

	useEffect( () => {
		setStocks(user.stocks)
	}, [user])
	
	return (
		<div>
			<Navbar 
				setIsLoggedIn={setIsLoggedIn} 
				isLoggedIn={isLoggedIn} 
			/>
			<h2>This is the Portfolio Page</h2>
			<table>
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
				{
					stocks
					&&
					stocks.map( (stock, i) => (
						<PortfolioItem 
							name={stock[0].name} 
							symbol={stock[0].symbol} 
							price={""} 
							number={stock[0].number}
						/>
					))
				}
			</table>
		</div>
	);
}

export default Portfolio;
