import {
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    TableBody
} from '@material-ui/core'


export default function SimpleSaleTable({ data, recordType, tableTitle }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>{tableTitle}</TableCell>
                        <TableCell align="right">Monthly Sale Count</TableCell>
                        <TableCell align="right">Yearly Sale Count</TableCell>
                        <TableCell align="right">All Time Sale Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row, index) => (
                            <TableRow
                                key={`${tableTitle}-${index}`}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row[`${recordType}`]}
                                </TableCell>
                                <TableCell align="right">
                                    {row.monthly_sales_count}
                                </TableCell>
                                <TableCell align="right">
                                    {row.year_sales_count}
                                </TableCell>
                                <TableCell align="right">
                                    {row.all_time_sales_count}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
