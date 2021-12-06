import axios from 'axios'
import { useState } from 'react'
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
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'


export default function GrossCustomerIncomeTable({ data }) {
    const [open, setOpen] = useState(Array(15).fill(false))
    const [curSaleData, setCurSaleData] = useState([])
    const [curRepairData, setCurRepairData] = useState([])
    const handleArrowClick = (index, customerID) => (event) => {
        event.preventDefault()
        if (open[index] === false) {
            let cur = Array(15).fill(false)
            cur[index] = true
            setOpen(cur)
            setCurRepairData([])
            setCurSaleData([])
            axios
                .all([
                    axios.post('http://localhost:8080/reports/customer-sale', {
                        customerID,
                    }),
                    axios.post(
                        'http://localhost:8080/reports/customer-repair',
                        { customerID }
                    ),
                ])
                .then(
                    axios.spread((res1, res2) => {
                        setCurSaleData(res1.data)
                        setCurRepairData(res2.data)
                    })
                )
        } else {
            setOpen(Array(15).fill(false))
            setCurRepairData([])
            setCurSaleData([])
        }
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Customer ID</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>First Sale or Repair Start Date</TableCell>
                        <TableCell>Recent Sale or Repair Start Date</TableCell>
                        <TableCell>Gross Income</TableCell>
                        <TableCell>Num of Sales</TableCell>
                        <TableCell>Num of Repairs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row, index) => (
                            <>
                                <TableRow
                                    key={row.customerID}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            onClick={handleArrowClick(
                                                index,
                                                row.customerID
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
                                        {row.customerID}
                                    </TableCell>
                                    <TableCell>{row.customer_name}</TableCell>
                                    <TableCell>
                                        {row.first_sale_or_repair_start_date}{' '}
                                    </TableCell>
                                    <TableCell>
                                        {row.recent_sale_or_repair_start_date}
                                    </TableCell>
                                    <TableCell>{row.gross_income}</TableCell>
                                    <TableCell>{row.num_of_sales}</TableCell>
                                    <TableCell>{row.num_of_repairs}</TableCell>
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
                                                Sale
                                            </Typography>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            VIN
                                                        </TableCell>
                                                        <TableCell>
                                                            Purchase Date
                                                        </TableCell>
                                                        <TableCell>
                                                            Sold Price
                                                        </TableCell>
                                                        <TableCell>
                                                            Model Year
                                                        </TableCell>
                                                        <TableCell>
                                                            Manufacturer Name
                                                        </TableCell>
                                                        <TableCell>
                                                            Model Name
                                                        </TableCell>
                                                        <TableCell>
                                                            Salesperson Name
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {curSaleData &&
                                                        curSaleData.map(
                                                            (row) => (
                                                                <TableRow
                                                                    key={
                                                                        row.vin
                                                                    }
                                                                >
                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                    >
                                                                        {
                                                                            row.vin
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.purchase_date
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.sold_price
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.model_year
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.manufacturer_name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.model_name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.salesperson_name
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                </TableBody>
                                            </Table>
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                component="div"
                                            >
                                                Repair
                                            </Typography>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            VIN
                                                        </TableCell>
                                                        <TableCell>
                                                            Start Date
                                                        </TableCell>
                                                        <TableCell>
                                                            Finish Date
                                                        </TableCell>
                                                        <TableCell>
                                                            Odometer
                                                        </TableCell>
                                                        <TableCell>
                                                            Parts Cost
                                                        </TableCell>
                                                        <TableCell>
                                                            Labor Charge
                                                        </TableCell>
                                                        <TableCell>
                                                            Total Cost
                                                        </TableCell>
                                                        <TableCell>
                                                            Service Writer Name
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {curRepairData &&
                                                        curRepairData.map(
                                                            (row) => (
                                                                <TableRow
                                                                    key={`${row.vin}-${row.start_date}`}
                                                                >
                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                    >
                                                                        {
                                                                            row.vin
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.start_date
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.finish_date
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.odometer
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.parts_cost
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.labor_charge
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.total_cost
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            row.service_writer_name
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
                            </>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
