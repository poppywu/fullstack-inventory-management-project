import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { MyContext } from '../MyContext'
import { Button } from '@material-ui/core'
import BackToHomeButton from '../navigation/BackToHomeButton'

function VehicleDetail() {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState({})
    const [saleInfo, setSaleInfo] = useState([])
    const [repairInfo, setRepairInfo] = useState([])
    const [inventoryClerkInfo, setInventoryClerkInfo] = useState({})
    const history = useHistory()
    const { isAuth, role,username } = useContext(MyContext)
    const handleSellClick = (event) => {
        event.preventDefault()
        history.push(`/vehicles/${id}/create-sale`)
    }
    useEffect(() => {
        axios
            .get(`http://localhost:8080/vehicles/${id}`)
            .then((res) => {
                setVehicle(res.data)
                return axios.get(`http://localhost:8080/${res.data.username}`)
            })
            .then((res) => {
                setInventoryClerkInfo(res.data)
            })
        axios.get(`http://localhost:8080/sale/${id}`).then((res) => {
            setSaleInfo(res.data)
        })
        axios.get(`http://localhost:8080/repair/${id}`).then((res) => {
            setRepairInfo(res.data)
        })
    }, [])
    

    const typeRender = (vehicle) => {
        const { vehicleType } = vehicle
        if (vehicleType === 'Car') {
            return <p>Num Of Doors : {vehicle.numDoors}</p>
        } else if (vehicleType === 'Convertible') {
            return (
                <>
                    <p>Roof Type : {vehicle.roofType}</p>
                    <p>Backseat Count : {vehicle.backseatCount}</p>
                </>
            )
        } else if (vehicleType === 'Truck') {
            return (
                <>
                    <p>Cargo Cover Type : {vehicle.cargoCoverType}</p>
                    <p>Num Rear Axles : {vehicle.numRearAxles}</p>
                    <p>Cargo Capacity : {vehicle.cargoCapacity}</p>
                </>
            )
        } else if (vehicleType === 'Van') {
            return (
                <>
                    <p>
                        Has Driverside Backdoor :{' '}
                        {vehicle.hasDriversideBackdoor?<span>yes</span>:<span>no</span>}
                    </p>
                </>
            )
        } else {
            return (
                <>
                    <p>Drivetrain Type : {vehicle.driveTrainType}</p>
                    <p>Num Cupholders : {vehicle.numCupholders}</p>
                </>
            )
        }
    }

    const listPrice = Math.round(vehicle.invoicePrice * 125) / 100
    return (
        <div>
            <BackToHomeButton />
            <div style={{ textAlign: 'center', marginTop: '5%' }}>
                <h2>Vehicle Detail</h2>
                <h4 style={{ marginBottom: '1%' }}> VIN - {id} </h4>
                {(username === 'roland'||role==='sales_person')&&saleInfo.length===0?(
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSellClick}
                    >
                        Sell
                    </Button>
                ):(<></>)}
                <p style={{ marginTop: '1%' }}> VIN : {vehicle.vin}</p>
                <p>Manufacturer Name : {vehicle.manufacturerName}</p>
                <p>Model Name : {vehicle.modelName}</p>
                <p>Model Year : {vehicle.modelYear}</p>
                <p>Vehicle Type : {vehicle.vehicleType}</p>
                <p>Description : {vehicle.description}</p>
                {isAuth && <p>Invoice Price : {vehicle.invoicePrice}</p>}
                <p>List Price : {listPrice}</p>
                <p>Color :
                {vehicle.color?.map((element, index) => (
                    <span key={index}>{element}</span>
                ))}
                {typeRender(vehicle)}
                </p>
                {(role == 'manager' || username == 'roland') && (
                    <>
                    <h3>Manager and Roland View Only</h3>
                    <p>
                            Inventory Clerk Name :
                            {inventoryClerkInfo.firstName}{' '}
                            {inventoryClerkInfo.lastName}
                        </p>
                <p>Date Added : {vehicle.addDate}</p>
                    {saleInfo.length!==0 ? (
                        <div>
                            <h3>Sale Info</h3>
                            {saleInfo.map((item) => (
                                <>
                                    <p>
                                        Salesperson Name :{' '}{item.salesperson_fname} {item.salesperson_lname}
                                    </p>
                                    <p>
                                        Customer First Name / Business Name :{' '}
                                        {item.first_name}
                                    </p>
                                    <p>
                                        Customer Last Name / Primary Contact :{' '}
                                        {item.last_name}
                                    </p>
                                    <p>Phone Number : {item.phone_number}</p>
                                    <p>Email Address : {item.email_address}</p>
                                    <p>
                                        Address :{' '}
                                        {`${item.street_address},${item.city},${item.state},${item.postcode}`}
                                    </p>
                                    <p>Sold Date : {item.purchase_date}</p>
                                    <p>Sold Price : {item.sold_price}</p>
                                </>
                            ))}
                        </div>
                    ):(<></>)}
                    {repairInfo.length!==0 ? (
                        <div>
                            <h3>Repair Info</h3>
                            {repairInfo.map((item, index) => (
                                <div key={`repair-${index}`}>
                                    <h5>Repair - {index + 1}</h5>
                                    <p>Start Date : {item.start_date}</p>
                                    <p>Finish Date : {item.finish_date}</p>
                                    <p>
                                        Service Writer Name:{' '}{item.service_writer_fname} {item.service_writer_lname}
                                    </p>
                                    <p>
                                        Customer First Name / Business Name :{' '}
                                        {item.first_name}
                                    </p>
                                    <p>
                                        Customer Last Name / Primary Contact :{' '}
                                        {item.last_name}
                                    </p>
                                    <p>Labor Charge : {item.labor_charge}</p>
                                    <p>Parts Cost : {item.total_parts}</p>
                                    <p>Total Cost : {item.labor_charge+item.total_parts}</p>
                                </div>
                            ))}
                        </div>
                    ):(<></>)}
                </>
            )}
            </div>
        </div>
    )
}

export default VehicleDetail
