import { useParams, useHistory } from 'react-router-dom'
import { useRef, useState} from 'react'
import {
    Button,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Card,
    CardContent
} from '@material-ui/core'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CreateRepair() {
    /*** state ***/
    const vinRef = useRef(null)
    const odometerRef = useRef(null)
    const descriptionRef = useRef(null)
    const [vinSearchErrorMsg, setVinSearchErrorMsg] = useState(null);
    const [createRepairMsg, setCreateRepairMsg] = useState(null);
    const [result, setResult] = useState(null)
    const [hasActiveRepair, setHasActiveRepair] = useState(null);
    const [activeRepairStartDate, setActiveRepairStartDate] = useState(null);
    const [activeRepairLaborCharge, setActiveRepairLaborCharge] = useState(0);
    const customerSearchRef = useRef(null)
    const [searched, setSearched] = useState(false)
    const [searchSuccess, setSearchSuccess] = useState(false)
    const [type,setType]=useState('individual');
    /*** handlers ***/
    const handleVinSearch = async (event) => {
        event.preventDefault()
        setResult([])
        const vin = vinRef.current.value;
        axios.get(`http://localhost:8080/vehicles?sold=true&vin=${vin}`).then(
            res => {
                console.log(res);
                if (res.data.length === 0) {
                    setVinSearchErrorMsg(true);
                } else {
                    setVinSearchErrorMsg(false);
                    setResult(res.data);
                    axios.get(`http://localhost:8080/active-repair/${vin}`).then(
                        activeRes => {
                            console.log(activeRes);
                            if (activeRes.data.length === 0) {
                                setHasActiveRepair(false);
                            } else {
                                setHasActiveRepair(true);
                                setActiveRepairStartDate(activeRes.data[0].startDate);
                                setActiveRepairLaborCharge(activeRes.data[0].laborCharge);
                            }
                        }
                    );  
                }   
            }
        );   
    }
    const handleIndividualClick = (event) => {
        event.preventDefault()
        window.open('/add-individual-customer', '_blank')
    }
    const handleBusinessClick = (event) => {
        event.preventDefault()
        window.open('/add-business-customer', '_blank')
    }
    const handleTypeChange=(event)=>{
        setType(event.target.value);
    }
    const handleCustomerSearch = async (event) => {
        event.preventDefault()
        setSearched(true)
        setSearchSuccess(false)
        const dlOrTinForSearch = customerSearchRef.current.value
        if(type==='individual'){
            axios.get(`http://localhost:8080/i-customers/${dlOrTinForSearch}`).then(res=>{
                if(res.data!==null){
                    setSearchSuccess(true);
                }
            })
        }else{
            axios.get(`http://localhost:8080/b-customers/${dlOrTinForSearch}`).then(res=>{
                if(res.data!=null){
                    setSearchSuccess(true);
                }
            })
        }
    }
    const handleCreateRepair = async (event) => {
        event.preventDefault();
        let payload = {
            vin: vinRef.current.value,
            //startDate: current date,
            username: localStorage.getItem('userToken'),
            customerID: customerSearchRef.current.value,
            //finishDate: null,
            //laborCharge: null,
            odometer: odometerRef.current.value,
            description: descriptionRef.current.value,
        };
        axios.post('http://localhost:8080/repair', payload).then(res => {
            console.log(res);
            setCreateRepairMsg('Repair created');
            //TODO: navigate to modify repair form for the created repair (that will have options to add labor charges and parts)
        });
    }
    /*** UI ***/
    return (
        <div>
            <h1>Create Repair</h1>
            {/** 
             * Search VIN 
             * If not sold or not in database, show error message
             * The rest of the form should only be shown after valid VIN is entered
             **/}
            <div style={{ marginLeft: '25%' }}>
                <TextField
                    id="outlined-basic"
                    label="VIN"
                    name="vin"
                    inputRef={vinRef}
                    style={{ marginRight: '2%' }}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: '40%' }}
                    onClick={handleVinSearch}
                >
                    Search VIN
                </Button>
                <p style={{ color: "red" }}>{vinSearchErrorMsg}</p>
            </div>

            {vinSearchErrorMsg == true && 
                <div style={{ marginTop: '2%'}}>
                    <p style={{ color: "red" }}>No sold vehicle found with given VIN.</p>
                </div>
            }

            {/**
             * Show Vehicle details for the searched VIN
             * VIN, vehicle type, model year, model name, manufacturer, color(s)
             **/}

            {result&& (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '2%'
                    }}>
                    {vinSearchErrorMsg&&<p>{vinSearchErrorMsg}</p>}
                    {result.map((item) => {
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
                            </Card>
                        )
                    })}
                </div>
            )}

            {/**
             * Check if there is an open repair for the vehicle, show message
             * "This vehicle currently has an unfinished repair."
             * Show repair form (only if VIN is valid and has no open repair):
             * odometer
             * start date <- current date
             * search for customer (may need to go to add customer form)
             * This is all that is needed to create the repair -
             * labor charges and parts are added afterwards in a new form
             **/}
            {hasActiveRepair == false && 
                <>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Odometer"
                            name="Odometer"
                            inputRef={odometerRef}
                            style={{ marginRight: '2%' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Description"
                            name="Description"
                            inputRef={descriptionRef}
                            style={{ marginRight: '2%' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Customer TIN OR DL"
                            name="customer-tin-or-dl"
                            inputRef={customerSearchRef}
                            style={{ marginBottom: '3%' }}
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Customer Type</FormLabel>
                            <RadioGroup
                                defaultValue="individual"
                                name="radio-buttons-group"
                                onChange={handleTypeChange}
                            >
                                <FormControlLabel
                                    value="individual"
                                    control={<Radio />}
                                    label="Individual"
                                />
                                <FormControlLabel
                                    value="business"
                                    control={<Radio />}
                                    label="Business"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCustomerSearch}
                            style={{ marginBottom: '3%' }}
                        >
                            Search Customer
                        </Button>
                    </div>
                    {searched && !searchSuccess && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '3%',
                            }}
                        >
                            <p>Not found! Please create a customer</p>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleIndividualClick}
                                style={{ marginRight: '2%' }}
                            >
                                Create Individual Customer
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBusinessClick}
                            >
                                Create Business Customer
                            </Button>
                        </div>
                    )}
                    {searched && searchSuccess && 
                        <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '3%',
                            }} >
                            <p>Great! we have the customer.</p>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateRepair}
                                style={{ marginRight: '2%' }}
                            >
                                Create Repair
                            </Button>
                            <p>{createRepairMsg}</p>
                        </div>
                    }
                </>
            }
            {hasActiveRepair == true &&
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center' 
                }}>
                    <p style={{ color: "black" }}>This vehicle already has an active repair.</p>
                    <Button
                        color="primary"
                        style={{ marginTop: '2%'}}
                    >
                        <Link to={{ pathname: `/update-repair`, 
                            vin: vinRef.current.value, 
                            startDate: activeRepairStartDate,
                            activeLaborCharge: activeRepairLaborCharge
                        }}>
                            Update/Finish Repair
                        </Link>
                    </Button>
                </div>
            }
        </div>
    )
}

export default CreateRepair
