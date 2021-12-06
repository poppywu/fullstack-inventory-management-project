import React, { useRef, useState } from 'react'
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    FormGroup,
} from '@material-ui/core'
import { modelYears, manufacturers, colors } from '../data'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import validatePayload from './InputValidation'
function AddVehicle(props) {
    const [errorMsg, setErrorMsg] = useState('')
    const vinRef = useRef(null)
    const modelNameRef = useRef(null)
    const modelYearRef = useRef(null)
    const priceRef = useRef(null)
    const descriptionRef = useRef(null)
    // car consts
    const numDoorsRef = useRef(null)
    // convertible consts
    const roofRef = useRef(null)
    const backseatRef = useRef(null)
    // suv consts
    const drivetrainRef = useRef(null)
    const cupholderRef = useRef(null)
    // truck consts
    const coverRef = useRef(null)
    const numRearAxlesRef = useRef(null)
    const capacityRef = useRef(null)
    // van consts
    const [hasDoor, setHasDoor] = useState(false)
    // generic vehicle consts
    const [modelYear, setModelYear] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [checked, setChecked] = useState(Array(colors.length).fill(false))
    const [colorList, setColorList] = useState([])
    const history = useHistory()
    const handleModelYearSelect = (event) => {
        setModelYear(event.target.value)
    }
    const handleManufacturerSelect = (event) => {
        setManufacturer(event.target.value)
    }
    const handleChange = (index) => {
        return (event) => {
            let newChecked = [...checked]
            setChecked((prev) => {
                newChecked[index] = !newChecked[index]
                return newChecked
            })
            setColorList((prev) => {
                let newColorList = []
                colors.forEach((color, index) => {
                    if (newChecked[index]) {
                        newColorList.push(color)
                    }
                })
                return newColorList
            })
        }
    }
    const handleHasDoor = (event) => {
        setHasDoor(!hasDoor)
    }
    const handleAddVehicleClick = (event) => {
        event.preventDefault()
        const payload = {
            vin: vinRef.current.value,
            modelYear: modelYearRef.current.value,
            modelName: modelNameRef.current.value,
            manufacturerName: manufacturer,
            color: colorList,
            invoicePrice: priceRef.current.value,
            vehicleType: props.type,
            description: descriptionRef.current.value,
            username: localStorage.getItem('userToken'),
        }
        if (props.type.toLowerCase() === 'car') {
            payload.numDoors = numDoorsRef.current.value
        }
        else if (props.type.toLowerCase() === 'convertible') {
            payload.roofType = roofRef.current.value
            payload.backseatCount = backseatRef.current.value
        }
        else if (props.type.toLowerCase() === 'suv') {
            payload.drivetrainType = drivetrainRef.current.value
            payload.numCupholders = cupholderRef.current.value
        }
        else if (props.type.toLowerCase() === 'truck') {
            payload.cargoCoverType = coverRef.current.value
            payload.numRearAxles = numRearAxlesRef.current.value
            payload.cargoCapacity = capacityRef.current.value
        }
        else if (props.type.toLowerCase() === 'van') {
            payload.hasDriversideBackdoor = hasDoor
        }
        let validation = validatePayload(payload)
        if (validation.valid) {
            axios.post(`http://localhost:8080/${props.type.toLowerCase()}`,payload).then(
                res=>{
                    history.push(`/vehicles/${vinRef.current.value}`)
                }
            )
        }
        else {
            setErrorMsg(validation.msg)
        }
    }
    return (
        <div>
            <h1>Add {props.type}</h1>
            <div style={{ marginLeft: '25%' }}>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="VIN"
                        name="vin"
                        inputRef={vinRef}
                        style={{ marginRight: '2%' }}
                    />
                </div>
                <div>
                    <FormControl
                        style={{ 'min-width': 200, marginRight: '2%' }}
                    >
                        <TextField
                            id="model-year-select"
                            label="Model Year"
                            name="model-year"
                            inputRef={modelYearRef}
                        />
                    </FormControl>
                    <FormControl
                        style={{ 'min-width': 200, marginRight: '2%' }}
                    >
                        <InputLabel id="manufacturer-select" variant="standard">
                            Manufacturer
                        </InputLabel>
                        <Select
                            labelId="manufacturer-select"
                            id="manufacturer-select"
                            label="Manufacturer"
                            value={manufacturer}
                            onChange={handleManufacturerSelect}
                        >
                            {manufacturers.map((item, index) => (
                                <MenuItem value={item} key={index}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="outlined-basic"
                        label="Model Name"
                        name="model-name"
                        inputRef={modelNameRef}
                        style={{ marginRight: '2%' }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Price"
                        name="price"
                        inputRef={priceRef}
                        style={{ marginRight: '2%' }}
                    />
                    {props.type.toLowerCase() === 'car' && 
                        <TextField
                            id="outlined-basic"
                            label="Num Doors"
                            name="num-doors"
                            inputRef={numDoorsRef}
                            style={{ marginRight: '2%' }}
                        />
                    }
                    {props.type.toLowerCase() === 'convertible' &&
                        <>
                        <TextField
                            id="outlined-basic"
                            label="Roof Type"
                            name="roof-type"
                            inputRef={roofRef}
                            style={{ marginRight: '2%' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Backseat Count"
                            name="backseat-count"
                            inputRef={backseatRef}
                            style={{ marginRight: '2%' }}
                        />
                        </>
                    }
                    {props.type.toLowerCase() === 'suv' &&
                        <>
                        <TextField
                            id="outlined-basic"
                            label="Drivetrain Type"
                            name="drivetrain-type"
                            inputRef={drivetrainRef}
                            style={{ marginRight: '2%' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Num Cupholders"
                            name="num-cupholders"
                            inputRef={cupholderRef}
                            style={{ marginRight: '2%' }}
                        />
                        </>
                    }
                    {props.type.toLowerCase() === 'truck' &&
                        <>
                        <TextField
                            id="outlined-basic"
                            label="Cargo Cover Type"
                            name="cargo-cover-type"
                            inputRef={coverRef}
                            style={{ marginRight: '2%' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Num Rear Axles"
                            name="num-rear-axles"
                            inputRef={numRearAxlesRef}
                            style={{ marginRight: '2%' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Cargo Capacity"
                            name="cargo-capacity"
                            inputRef={capacityRef}
                            style={{ marginRight: '2%' }}
                        />
                        </>
                    }
                    {props.type.toLowerCase() === 'van' &&
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasDoor}
                                    onChange={handleHasDoor}
                                />
                            }
                            label="Has Driverside Backdoor"
                        />
                    }
                </div>
                <div>
                    <p>Colors</p>
                    <FormGroup row style={{ maxWidth: '70%' }}>
                        {colors.map((color, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={checked[index]}
                                        onChange={handleChange(index)}
                                    />
                                }
                                label={color}
                            />
                        ))}
                    </FormGroup>
                </div>
                <TextField
                    id="outlined-basic"
                    label="Description"
                    name="description"
                    inputRef={descriptionRef}
                    style={{ marginRight: '2%' }}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: '40%' }}
                    onClick={handleAddVehicleClick}
                >
                    Add {props.type} 
                </Button>
                <p style={{ color: "red" }}>{errorMsg}</p>
            </div>
        </div>
    )
}

export default AddVehicle
