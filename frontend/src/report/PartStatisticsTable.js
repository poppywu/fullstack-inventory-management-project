import {
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    TableBody
} from '@material-ui/core'
function PartStatisticsTable({data}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Vendor Name</TableCell>
                        <TableCell>Num of Parts</TableCell>
                        <TableCell>Total Spending</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row, index) => (
                            <TableRow
                                key={row.vendor_name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.vendor_name}
                                </TableCell>
                                <TableCell>
                                    {row.num_parts}
                                </TableCell>
                                <TableCell>
                                    {row.total_spending}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PartStatisticsTable
