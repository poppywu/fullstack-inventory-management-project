import {
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    TableBody
} from '@material-ui/core'
function BelowCostTable({data}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Salesperson Name</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>VIN</TableCell>
                        <TableCell>Purchase Date</TableCell>
                        <TableCell>Invoice Price</TableCell>
                        <TableCell>Sold Price</TableCell>
                        <TableCell>Ratio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row, index) => {
                            const ratio=Number.parseFloat(row.sold_price/row.invoice_price).toFixed(2)*100;
                            return (
                            <TableRow
                                key={row.vin}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                style={{backgroundColor:ratio<=95?'crimson':'white'}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.salesperson_name}
                                </TableCell>
                                <TableCell>
                                    {row.customer_name}
                                </TableCell>
                                <TableCell>
                                    {row.vin}
                                </TableCell>
                                <TableCell>
                                    {row.purchase_date}
                                </TableCell>
                                <TableCell>
                                    {row.invoice_price}
                                </TableCell>
                                <TableCell>
                                    {row.sold_price}
                                </TableCell>
                                <TableCell>
                                    {ratio}{'%'}
                                </TableCell>
                            </TableRow>
                        )})}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BelowCostTable
