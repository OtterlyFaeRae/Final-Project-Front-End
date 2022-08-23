import styled from "styled-components"
import { useEffect, useState } from "react"

const PortfolioItem = ({symbol, price, number, index}) => {

    const [ total, setTotal ] = useState(0)

    const getTotal = async () => {
        const result = price * number
        setTotal( result )
    }

    useEffect( () => {
        getTotal()
    }, [price])

    return (
            <StyledRow index = {index} symbol = {symbol} price = {price} number = {number} total = {total}>
                <TableData>
                {symbol}
                </TableData>
                <TableData>
                    {number}
                </TableData>
                <TableData>
                    {price}
                </TableData>
                <TableData>
                    {total}
                </TableData>
        </StyledRow>
    )
}

// const TableRow = ({index, symbol, price, number, total}) => {
//     return (
    // <tr>
    //     <TableData>
    //         {symbol}
    //     </TableData>
    //     <TableData>
    //         {number}
    //     </TableData>
    //     <TableData>
    //         {price}
    //     </TableData>
    //     <TableData>
    //         {total}
    //     </TableData>
    // </tr>
//     )
// }

const StyledRow = styled.tr`
    ${props => props.index % 2 === 1 ? 'background-color: #222224;' : 'background-color: #28292e;'}
`
const TableData = styled.td`
    width: 25%;
    padding-top: 5px;
    padding-bottom: 5px;
`

export default PortfolioItem