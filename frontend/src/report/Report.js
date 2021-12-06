import axios from 'axios'
import { useEffect, useState, lazy, Suspense } from 'react'
import AverageDaysTable from './AverageDaysTable'
import BelowCostTable from './BelowCostTable'
import PartStatisticsTable from './PartStatisticsTable'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
const SimpleSaleTable = lazy(() => import('./SimpleSaleTable'))
const GrossCustomerIncomeTable = lazy(() =>
    import('./GrossCustomerIncomeTable')
)
const ManufacturerRepair = lazy(() => import('./ManufacturerRepairTable'))
const MonthlySaleTable = lazy(() => import('./MonthlySaleTable'))
import { reportNames } from '../data'

function Report() {
    const [report, setReport] = useState([])
    const [colorSale, setColorSale] = useState([])
    const [manufacturerSale, setManufacturerSale] = useState([])
    const [typeSale, setTypeSale] = useState([])
    const [grossCustomerIncome, setGrossCustomerIncome] = useState([])
    const [averageDaysInInventory, setAverageDaysInInventory] = useState([])
    const [manufacturerRepair, setManufacturerRepair] = useState([])
    const [belowCost, setBelowCost] = useState([])
    const [partStatistics, setPartStatistics] = useState([])
    const [monthlySale, setMonthlySale] = useState([])
    const [reportName, setReportName] = useState('')
    useEffect(() => {
        axios.get('http://localhost:8080/reports').then((res) => {
            setReport(res.data)
            setColorSale(report[0])
            setTypeSale(report[1])
            setManufacturerSale(report[2])
            setGrossCustomerIncome(report[3])
            setAverageDaysInInventory(report[4])
            setManufacturerRepair(report[5])
            setBelowCost(report[6])
            setPartStatistics(report[7])
            setMonthlySale(report[8])
        })
    }, [report])
    const handleReportSelect = (event) => {
        event.preventDefault()
        setReportName(event.target.value)
    }
    const reportRender = () => {
        if (reportName === 'Sale By Color') {
            return (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '1%' }}>
                        Sale By Color
                    </h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SimpleSaleTable
                            data={colorSale}
                            recordType={'color'}
                            tableTitle={'Color'}
                        />
                    </Suspense>
                </>
            )
        } else if (reportName === 'Sale By Vehicle Type') {
            return (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '1%' }}>
                        Sale By Vehicle Type
                    </h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SimpleSaleTable
                            data={typeSale}
                            recordType={'vehicle_type'}
                            tableTitle={'Vehicle Type'}
                        />
                    </Suspense>
                </>
            )
        } else if (reportName === 'Sale By Manufacturer') {
            return (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '1%' }}>
                        Sale By Manufacturer
                    </h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SimpleSaleTable
                            data={manufacturerSale}
                            recordType={'manufacturer_name'}
                            tableTitle={'Manufacturer'}
                        />
                    </Suspense>
                </>
            )
        } else if (reportName === 'Top Customer Gross Income') {
            return (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '1%' }}>
                        Top Customer Gross Income
                    </h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <GrossCustomerIncomeTable data={grossCustomerIncome} />
                    </Suspense>
                </>
            )
        } else if (reportName === 'Manufacturer Repair') {
            return (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '1%' }}>
                        Manufacturer Repair
                    </h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ManufacturerRepair data={manufacturerRepair} />
                    </Suspense>
                </>
            )
        } else if (reportName === 'Below Cost Sale') {
            return (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '1%' }}>
                        Below Cost Sale
                    </h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <BelowCostTable data={belowCost} />
                    </Suspense>
                </>
            )
        } else if (reportName === 'Average Days In Inventory') {
            return (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '1%' }}>
                        Average Days In Inventory
                    </h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AverageDaysTable data={averageDaysInInventory} />
                    </Suspense>
                </>
            )
        } else if (reportName === 'Parts Statistics') {
            return (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '1%' }}>
                        Parts Statistics
                    </h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PartStatisticsTable data={partStatistics} />
                    </Suspense>
                </>
            )
        } else if (reportName === 'Monthly Sale') {
            return (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '1%' }}>
                        Monthly Sale
                    </h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <MonthlySaleTable data={monthlySale} />
                    </Suspense>
                </>
            )
        } else {
            return <p>Please Select A Report</p>
        }
    }
    return (
        <div
            style={{
                minHeight: '100%',
                height: '100vh',
            }}
        >
            <div style={{ height: '10px', textAlign: 'center' }}></div>
            <div style={{ textAlign: 'center',marginBottom:'2%' }}>
                <h1 style={{ marginBottom:'2%' }}>Report</h1>
                <div>
                    <FormControl style={{ 'min-width': 200 }}>
                        <InputLabel id="report-select" variant="standard">
                            Report Name
                        </InputLabel>
                        <Select
                            labelId="report-select"
                            id="report-select"
                            label="report"
                            value={reportName}
                            onChange={handleReportSelect}
                        >
                            {reportNames.map((item) => (
                                <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div
                    style={{
                        maxWidth: '70%',
                        marginLeft: '15%',
                        marginTop: '3%',
                    }}
                >
                    {reportRender()}
                </div>
            </div>
        </div>
    )
}

export default Report
