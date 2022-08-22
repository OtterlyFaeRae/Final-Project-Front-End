import styled from "styled-components"
import { useEffect, useState } from "react"

const PortfolioItem = ({name, symbol, price, number}) => {

    const [ total, setTotal ] = useState(0)

    const getTotal = async () => {
        const result = price * number
        setTotal( result.toFixed(2) )
    }

    useEffect( () => {
        getTotal()
    }, [price])

    return (
        <>
        {
            number > 0
            &&
            <TableRow>
                <TableData>
                    {symbol}
                </TableData>
                <TableData>
                    {number}
                </TableData>
                <TableData>
                    {price.toFixed(2)}
                </TableData>
                <TableData>
                    {total}
                </TableData>
            </TableRow>
        }
        </>
    )
}

export default PortfolioItem

const TableRow = styled.tr`
`
const TableData = styled.td`
`