import styled from "styled-components"

const PortfolioItem = ({name, symbol, price, number}) => {

    return (
        <TableRow>
            <TableData>
                {name}
            </TableData>
            <TableData>
                {symbol}
            </TableData>
            <TableData>
                {price}
            </TableData>
            <TableData>
                {number}
            </TableData>
        </TableRow>
    )
}

export default PortfolioItem

const TableRow = styled.tr`
`
const TableData = styled.td`
`