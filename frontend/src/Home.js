import { useRef, useContext, useState, useEffect } from 'react'
import { MyContext} from './MyContext'
import {
    Button,
    TextField,
    FormControl,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Radio,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    CardActions,
} from '@material-ui/core'
import { vehicleType, manufacturers, colors } from './data'
import './Home.css'
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom'

function Home() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const priceRef = useRef(null)
    const keywordsRef = useRef(null)
    const vinRef = useRef(null)
    const modelNameRef = useRef(null)
    const yearRef=useRef(null)
    const [manufacturer, setManufacturer] = useState('')
    const [color, setColor] = useState('')
    const [sold, setSold] = useState('')
    const [type, setType] = useState('')
    const [result, setResult] = useState(null)
    const [unsoldVehicleCount, setUnsoldVehicleCount] = useState(0)
    const [error,setError]=useState(null)
    const { loginUser, logoutUser, isAuth, role, username, loginErrorMsg } = useContext(MyContext)
    const history=useHistory();
    const handleLogin = async (event) => {
        event.preventDefault()
        await loginUser({
            username: emailRef.current.value,
            password: passwordRef.current.value,
        })
    }
    const handleLogout = async (event) => {
        event.preventDefault()
        await logoutUser()
    }
    const handleSearch = (event) => {
        event.preventDefault()
        setResult([])
        setError(null)
        let paramsObj = {}
        if (yearRef.current.value !== '') {
            paramsObj.modelYear = yearRef.current.value
        }
        if (modelNameRef.current.value !== '') {
            paramsObj.modelName = modelNameRef.current.value
        }
        if (priceRef.current.value !== '') {
            paramsObj.maxPrice = priceRef.current.value
        }
        if (manufacturer !== '') {
            paramsObj.manufacturerName = manufacturer
        }
        if (color !== '') {
            paramsObj.color = color
        }
        if (keywordsRef.current.value !== '') {
            paramsObj.description = keywordsRef.current.value
        }
        if (type !== '') {
            paramsObj.vehicleType = type
        }
        if (
            isAuth === false ||
            role === 'inventory_clerk' ||
            role === 'sales_person'
        ) {
            paramsObj.sold = false
        }
        if((role == "manager" || username == "roland") && sold !== ''){
            if(sold == 'True'){paramsObj.sold = true}
            if(sold == 'False'){paramsObj.sold = false}
            if(sold == 'All'){paramsObj.sold = ''}
        }
        if (isAuth && vinRef.current.value !== ''){
            paramsObj.vin = vinRef.current.value
        }
        axios
            .get('http://localhost:8080/vehicles', {
                params: paramsObj,
            })
            .then((res) => {
                if (res.data.length === 0) {
                    setError(
                        'Sorry, it looks like we don’t have that in stock!'
                    )
                } else {
                    let sorted = res.data.sort((a,b) => (a.vin>b.vin) ? 1: -1)
                    setResult(sorted)
                    setManufacturer('')
                    setColor('')
                    setType('')
                    setSold('')

                }
            })
    }
    const handleManufacturerSelect = (event) => {
        setManufacturer(event.target.value)
    }
    
    const handleColorSelect = (event) => {
        setColor(event.target.value)
    }
    const handleSoldSelect = (event) => {
        setSold(event.target.value)
    }
    const handleTypeChange = (event) => {
        setType(event.target.value)
    }

    useEffect(() => {
        axios.get('http://localhost:8080/unsold-vehicle-count').then((res) => {
            setUnsoldVehicleCount(res.data)
        })
    }, [unsoldVehicleCount])

    const handleAddVehicleClick=(event)=>{
        event.preventDefault();
        history.push('/select-add-vehicle-type')
    }
    const handleAddRepairClick=(event)=>{
        event.preventDefault();
        history.push('/create-repair')
    }
    const handleViewReportClick=(event)=>{
        event.preventDefault()
        history.push('/report')
    }
    return (
        <div className="App">
            <div className="header">
                <h1>Jaunty Jalopies</h1>
                <div>
                    {isAuth && (
                        <div className="login__greeting">
                            <p>Hello, {username.charAt(0).toUpperCase() + username.slice(1)}</p>
                            <Button variant="text" onClick={handleLogout}>
                                Logout
                            </Button>
                            {role === 'inventory_clerk' || username === 'roland' ? (
                                <Button variant="contained" color="primary" onClick={handleAddVehicleClick}>
                                    Add Vehicle
                                </Button>
                            ) : (
                                <></>
                            )}
                            {role === 'service_writer' || username === 'roland' ? (
                                <Button variant="contained" color="primary" onClick={handleAddRepairClick}>
                                    Add Repair 
                                </Button>
                            ) : (
                                <></>
                            )}
                            {username === 'roland' || role === 'manager' ? (
                                <Button variant="contained" color="primary" onClick={handleViewReportClick}>
                                    View Report
                                </Button>
                            ) : (
                                <></>
                            )}
                        </div>
                    )}
                    {!isAuth && (
                        <form>
                            <div className="login__form">
                                <div className="email__input">
                                    <TextField
                                        id="outlined-basic"
                                        type="email"
                                        label="Email"
                                        name="email"
                                        inputRef={emailRef}
                                    />
                                </div>
                                <div className="password__input">
                                    <TextField
                                        id="outlined-password-input"
                                        type="password"
                                        label="Password"
                                        name="password"
                                        inputRef={passwordRef}
                                    />
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </Button>
                                    <p>{loginErrorMsg}</p>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div className="search__section">
                <h3 style={{ marginTop: '2%' }}>Search A Vehicle</h3>
                <p>{unsoldVehicleCount} unsold vehicles</p>
                <div className="search__input">
                    <div className="radio__group">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">
                                Vehicle Type
                            </FormLabel>
                            <RadioGroup
                                row
                                name="row-radio-buttons-group"
                                value={type}
                                onChange={handleTypeChange}
                            >
                                {vehicleType.map((type) => (
                                    <FormControlLabel
                                        key={type}
                                        value={type}
                                        control={<Radio />}
                                        label={type}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="select__group">
                        <FormControl
                            style={{ 'min-width': 200, marginRight: '2%' }}
                        >
                            <InputLabel
                                id="manufacturer-select"
                                variant="standard"
                            >
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
                            label="Model Year"
                            name="modelYear"
                            inputRef={yearRef}
                            style={{ marginRight: '2%' }}
                        />
                        <FormControl
                            style={{ 'min-width': 200, marginRight: '2%' }}
                        >
                            <InputLabel id="color-select" variant="standard">
                                Color
                            </InputLabel>
                            <Select
                                labelId="color-select"
                                id="color-select"
                                label="Color"
                                value={color}
                                onChange={handleColorSelect}
                            >
                                {colors.map((item, index) => (
                                    <MenuItem value={item} key={index}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {(role == "manager" || username == "roland") && 
                        <FormControl
                            style={{ 'min-width': 200, marginRight: '2%' }}
                        >
                            <InputLabel id="sold-select" variant="standard">
                                Sold
                            </InputLabel>
                            <Select
                                labelId="sold-select"
                                id="sold-select"
                                label="Sold"
                                value={sold}
                                onChange={handleSoldSelect}
                            >
                                    <MenuItem value="All" key="All">All</MenuItem>
                                    <MenuItem value="True" key="True">Sold</MenuItem>
                                    <MenuItem value="False" key="False">Not Sold</MenuItem>
                            </Select>
                        </FormControl>
                        }
                    </div>
                    <div className="search__input__group">
                        <TextField
                            id="outlined-basic"
                            label="Model Name"
                            name="modelName"
                            inputRef={modelNameRef}
                            style={{ marginRight: '2%' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Max Price"
                            name="price"
                            inputRef={priceRef}
                            style={{ marginRight: '2%' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Keywords"
                            name="keywords"
                            inputRef={keywordsRef}
                            style={{ marginRight: '2%' }}
                        />
                        {isAuth && (
                            <TextField
                                id="outlined-basic"
                                label="VIN"
                                name="vin"
                                inputRef={vinRef}
                                style={{ marginRight: '2%' }}
                            />
                        )}
                    </div>
                </div>
                <div style={{ marginBottom: '2%' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
            </div>
            {result&& (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '2%',
                    }}>
                    {!error && <p style={{ textAlign: 'center', marginBottom: '2%' }}>
                        {result.length} Result(s)
                        </p>}
                    {error&&<p>{error}</p>}
                    {result.sort((a,b)=>(a.vin>b.vin)?1:-1).map((item) => {
                        const listPrice =
                            Math.round(item.invoicePrice * 125) / 100
                        return (
                            <Card
                                key={item.vin}
                                elevation={3}
                                style={{
                                    width: '50%',
                                    flex: '1 1 33%',
                                    marginBottom: '2%',
                                }}
                            >
                                <CardContent>
                                    <p>Vehicle VIN : {item.vin}</p>
                                    <p>
                                        Manufacturer Name :{' '}
                                        {item.manufacturerName} Model Name :{' '}
                                        {item.modelName} Model Year :{' '}
                                        {item.modelYear}
                                    </p>
                                    <p>
                                        Vehicle Type : {item.vehicleType}{' '}
                                        Vehicle Color(s) : {item.color}
                                    </p>
                                    <p>Description : {item.description}</p>
                                    <p>List Price : {listPrice}</p>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">
                                        <Link to={`/vehicles/${item.vin}`}>
                                            Learn More
                                        </Link>
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
            )}
            </div> 
    )
}

export default Home
