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
} from '@material-ui/core'
import axios from 'axios'


function CreateSale() {
    const { id } = useParams()
    const priceRef = useRef(null)
    const customerSearchRef = useRef(null)
    const [searched, setSearched] = useState(false)
    const [searchSuccess, setSearchSuccess] = useState(false)
    const [createSaleMsg, setCreateSaleMsg] = useState(false)
    const [type,setType]=useState('individual');
    const handleIndividualClick = (event) => {
        event.preventDefault()
        window.open('/add-individual-customer', '_blank')
    }
    const handleBusinessClick = (event) => {
        event.preventDefault()
        window.open('/add-business-customer', '_blank')
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
    const handleCreateSaleClick = (event) => {
        event.preventDefault()
        const payload = {
            username: localStorage.getItem('userToken'),
            vin: id,
            customerID: customerSearchRef.current.value,
            soldPrice: priceRef.current.value,
        }
        axios.post('http://localhost:8080/sale', payload).then(res => {
            setCreateSaleMsg('Car sold!');
        });
    }
    const handleTypeChange=(event)=>{
        setType(event.target.value);
    }
    return (
        <div
            style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <h2 style={{ marginTop: '5%' }}>Sale</h2>
            <h4 style={{ marginBottom: '4%' }}>VIN - {id}</h4>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div style={{ marginBottom: '3%' }}>
                    {!searched ? (
                        <p>Please search customer before sale</p>
                    ) : searchSuccess ? (
                        <p>Great! we have the customer.</p>
                    ) : (
                        <p>Not found! Please create a customer</p>
                    )}
                </div>
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
                    label="Sold Price"
                    name="sold-price"
                    inputRef={priceRef}
                    style={{ marginBottom: '3%' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateSaleClick}
                >
                    Create Sale
                </Button>
                <p>{createSaleMsg}</p>
            </div>
        </div>
    )
}

export default CreateSale
