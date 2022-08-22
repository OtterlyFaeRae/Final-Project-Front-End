import styled from "styled-components"

const PortfolioItem = ({name, symbol, price, number}) => {

    return (
        <TableRow>
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
                {price * number}
            </TableData>
        </TableRow>
    )
}

export default PortfolioItem

const TableRow = styled.tr`
    border: solid 1px black;
    background-color: red;
`
const TableData = styled.td`
    border: solid 1px black;
`