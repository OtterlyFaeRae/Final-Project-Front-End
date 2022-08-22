import styled from "styled-components"

const PortfolioItem = ({name, symbol, price, number, index}) => {

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
                {price * number}
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