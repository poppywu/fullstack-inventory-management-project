import {
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    TableBody
} from '@material-ui/core'
function AverageDaysTable({data}) {
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell>Vehicle Type</TableCell>
                    <TableCell>Average Days In Inventory</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data &&
                    data.map((row) => (
                        <TableRow
                            key={row.vehicle_type}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.vehicle_type}
                            </TableCell>
                            <TableCell>
                                {Math.ceil(row.average_days_in_inventory)}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer> 
    )
}

export default AverageDaysTable
