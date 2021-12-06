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
import {KeyboardArrowDown,KeyboardArrowUp} from '@material-ui/icons'
import { useState } from 'react'

export default function ManufacturerRepairTable({ data }) {
    const [open, setOpen] = useState(Array(50).fill(false))
    const [openType, setOpenType] = useState({
        Car: false,
        Truck: false,
        Convertible: false,
        Van: false,
        SUV: false,
    })
    const [curRepairByIDData, setCurRepairByIDData] = useState([])
    const [curRepairByTypeData, setCurRepairByTypeData] = useState([])
    const handleIDDrillDown = (index, manufacturerID) => (event) => {
        if (open[index] === false) {
            let cur = Array(15).fill(false)
            cur[index] = true
            setOpen(cur)
            setCurRepairByIDData([])
            axios
                .post('http://localhost:8080/reports/manufacturer-repair', {
                    manufacturerID,
                })
                .then((res) => setCurRepairByIDData(res.data))
        } else {
            setOpen(Array(50).fill(false))
            setCurRepairByIDData([])
        }
    }
    const handleIDAndTypeDrillDown =
        (manufacturerID, vehicleType) => (event) => {
            if (openType[`${vehicleType}`] === false) {
                let cur = {
                    Car: false,
                    Truck: false,
                    Convertible: false,
                    Van: false,
                    SUV: false
                };
                setOpenType({ ...cur, [`${vehicleType}`]: true });
                axios.post('http://localhost:8080/reports/manufacturer-type-repair', { manufacturerID, vehicleType }).then(res => setCurRepairByTypeData(res.data))
            } else {
                setOpenType({
                    Car: false,
                    Truck: false,
                    Convertible: false,
                    Van: false,
                    SUV: false,
                });
                setCurRepairByTypeData([]);
            }
        }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Manufacturer ID</TableCell>
                        <TableCell align="right">Manufacturer Name</TableCell>
                        <TableCell align="right">Num of Repairs</TableCell>
                        <TableCell align="right">Labor Cost</TableCell>
                        <TableCell align="right">Parts Cost</TableCell>
                        <TableCell align="right">Total Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row, index) => (
                            <>
                                <TableRow key={row.manufacturerID} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell>
                                        <IconButton size="small" onClick={handleIDDrillDown(index,row.manufacturerID)}>
                                            {open[index] ? (<KeyboardArrowUp />) : (<KeyboardArrowDown />)}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell component="th" scope="row">{row.manufacturerID}</TableCell>
                                    <TableCell>{row.manufacturer_name}</TableCell>
                                    <TableCell>{row.num_of_repairs}</TableCell>
                                    <TableCell>{row.labor_cost}</TableCell>
                                    <TableCell>{row.parts_cost}</TableCell>
                                    <TableCell>{row.total_cost}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{paddingBottom: 0,paddingTop: 0}} colSpan={6}>
                                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                            <Typography variant="h6" gutterBottom component="div" >
                                                Manufacturer Repair Detail
                                            </Typography>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>ManufacturerID</TableCell>
                                                        <TableCell>Vehicle Type</TableCell>
                                                        <TableCell>Num of Repairs</TableCell>
                                                        <TableCell>Labor Cost</TableCell>
                                                        <TableCell>Parts Cost</TableCell>
                                                        <TableCell>Total Cost</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {curRepairByIDData &&
                                                        curRepairByIDData.map(
                                                            (row) => (
                                                                <>
                                                                    <TableRow key={`${row.manufacturerID}-${row.vehicle_type}`} onClick={handleIDAndTypeDrillDown(row.manufacturerID, row.vehicle_type)}>
                                                                        <TableCell component="th" scope="row">{row.manufacturerID}</TableCell>
                                                                        <TableCell>{row.vehicle_type}</TableCell>
                                                                        <TableCell>{row.num_of_repairs}</TableCell>
                                                                        <TableCell>{row.labor_cost}</TableCell>
                                                                        <TableCell>{row.parts_cost}</TableCell>
                                                                        <TableCell>{row.total_cost}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={6}>
                                                                            <Collapse in={openType[row.vehicle_type]} timeout="auto" unmountOnExit>
                                                                                <Typography variant="h6" gutterBottom component="div" >
                                                                                    Manufacture Repair Detail By Vehicle Type
                                                                                </Typography>
                                                                                <Table size="small">
                                                                                    <TableHead>
                                                                                        <TableRow>
                                                                                            <TableCell>ManufacturerID</TableCell>
                                                                                            <TableCell>Vehicle Type</TableCell>
                                                                                            <TableCell>Model Name</TableCell>
                                                                                            <TableCell>Num of Repairs</TableCell>
                                                                                            <TableCell>Labor Cost</TableCell>
                                                                                            <TableCell>Parts Cost</TableCell>
                                                                                            <TableCell>Total Cost</TableCell>
                                                                                        </TableRow>
                                                                                    </TableHead>
                                                                                    <TableBody>
                                                                                        {curRepairByTypeData &&
                                                                                            curRepairByTypeData.map(
                                                                                                (row,index)=> 
                                                                                                    (<TableRow key={`${row.manufacturerID}-${row.vehicle_type}-${index}`}>
                                                                                                        <TableCell component="th" scope="row">{row.manufacturerID}</TableCell>
                                                                                                        <TableCell>{row.vehicle_type}</TableCell>
                                                                                                        <TableCell>{row.model_name}</TableCell>
                                                                                                        <TableCell>{row.num_of_repairs}</TableCell>
                                                                                                        <TableCell>{row.labor_cost}</TableCell>
                                                                                                        <TableCell>{row.parts_cost}</TableCell>
                                                                                                        <TableCell>{row.total_cost}</TableCell>
                                                                                                    </TableRow>)
                                                                                            )}
                                                                                    </TableBody>
                                                                                </Table>
                                                                            </Collapse>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>
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
