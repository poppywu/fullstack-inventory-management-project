import {
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    TableBody,
    IconButton,
    Collapse,
    Typography,
} from '@material-ui/core'
import axios from 'axios'
import { KeyboardArrowDown, KeyboardArrowUp} from '@material-ui/icons'
import { useState } from 'react'

export default function MonthlySaleTable({ data }) {
    const [open, setOpen] = useState(Array(24).fill(false))
    const [curSaleDetailData, setCurSaleDetailData] = useState([])
    const handleArrowClick = (index, month) => (event) => {
        event.preventDefault()
        if (open[index] === false) {
            let cur = Array(24).fill(false)
            cur[index] = true
            setOpen(cur)
            setCurSaleDetailData([])
            axios
                .post('http://localhost:8080/reports/monthly-sale', { month })
                .then((res) => {
                    setCurSaleDetailData(res.data)
                })
        } else {
            setOpen(Array(24).fill(false))
            setCurSaleDetailData([])
        }
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Month</TableCell>
                        <TableCell>Total Num Sold</TableCell>
                        <TableCell>Total Sales Income</TableCell>
                        <TableCell>Total Net Income</TableCell>
                        <TableCell>Sold Invoice Ratio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row, index) => {
                            const ratio=Math.round(row.sold_invoice_ratio)
                            return (<>
                                <TableRow
                                    key={row.month}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                    style={{backgroundColor:ratio>=125?'lightgreen':ratio<=110?'gold':'white'}}
                                >
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            onClick={handleArrowClick(
                                                index,
                                                row.month
                                            )}
                                        >
                                            {open[index] ? (
                                                <KeyboardArrowUp />
                                            ) : (
                                                <KeyboardArrowDown />
                                            )}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.month}
                                    </TableCell>
                                    <TableCell>{row.total_num_sold}</TableCell>
                                    <TableCell>
                                        {row.total_sales_income}
                                    </TableCell>
                                    <TableCell>
                                        {row.total_net_income}
                                    </TableCell>
                                    <TableCell>
                                        {ratio}{'%'}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        style={{
                                            paddingBottom: 0,
                                            paddingTop: 0,
                                        }}
                                        colSpan={6}
                                    >
                                        <Collapse
                                            in={open[index]}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                component="div"
                                            >
                                                Sale Detail By Month
                                            </Typography>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            First Name
                                                        </TableCell>
                                                        <TableCell>
                                                            Last Name
                                                        </TableCell>
                                                        <TableCell>
                                                            Num Sold
                                                        </TableCell>
                                                        <TableCell>
                                                            Total Sales Income
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {curSaleDetailData &&
                                                        curSaleDetailData.map(
                                                            (row, index) => (
                                                                <TableRow
                                                                    key={`${row.firstname}->${index}`}
                                                                >
                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                    >
                                                                        {
                                                                            row.first_name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.last_name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.num_sold
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.total_sales_income
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                </TableBody>
                                            </Table>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </>)}
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
