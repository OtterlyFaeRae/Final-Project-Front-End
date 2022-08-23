import styled from "styled-components"
import { useEffect, useState } from "react"

const PortfolioItem = ({name, symbol, price, number, index}) => {

    const [ total, setTotal ] = useState(0)

    const getTotal = async () => {
        const result = price * number
        setTotal( result )
    }

    useEffect( () => {
        getTotal()
    }, [price])

    return (
            <TableRow index = {index}>

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
            </TableRow>
    )
}

const TableRow = styled.tr`
    ${props => props.index % 2 === 1 ? 'background-color: #222224' : 'background-color: #28292e'}
`
const TableData = styled.td`
    width: 25%;
`

export default PortfolioItem