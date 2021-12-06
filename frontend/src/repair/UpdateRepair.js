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


function UpdateRepair(props) {
    const history=useHistory()
    const laborChargeRef = useRef(null)
    const partNumberRef = useRef(null)
    const vendorNameRef = useRef(null)
    const quantityRef = useRef(null)
    const priceRef = useRef(null)
    const [laborChargeMsg, setLaborChargeMsg] = useState(null)
    const [addPartMsg, setAddPartMsg] = useState(null)

    const handleUpdateLaborCharge = async (event) => {
        event.preventDefault()
        console.log('props')
        console.log(props)
        console.log(props.location)
        let payload = {
            vin: props.location.vin,
            startDate: props.location.startDate,
            laborCharge: laborChargeRef.current.value
        }
        axios.post(`http://localhost:8080/repair/update-labor-charge`, payload).then(res => {
            console.log(res);
            setLaborChargeMsg('Labor charge updated');
        }).catch(error => {
            if (error.response.status == 304) { // Not modified
                setLaborChargeMsg('New labor charge must be greater than previous');
            }
        });
    }

    const handleAddPart = async (event) => {
        event.preventDefault()
        let payload = {
            vin: props.location.vin,
            startDate: props.location.startDate,
            partNumber: partNumberRef.current.value,
            vendorName: vendorNameRef.current.value,
            quantity: quantityRef.current.value,
            price: priceRef.current.value
        }
        axios.post(`http://localhost:8080/repair/add-part`, payload).then(res => {
            console.log(res);
            setAddPartMsg(`Added ${payload.quantity} part(s) ${payload.partNumber} from ${payload.vendorName}`);
            partNumberRef.current.value = null;
            vendorNameRef.current.value = null;
            quantityRef.current.value = null;
            priceRef.current.value = null;
        });
    }

    const handleFinishRepair = async (event) => {
        event.preventDefault()
        let payload = {
            vin: props.location.vin,
            startDate: props.location.startDate
        }
        axios.post(`http://localhost:8080/finish-repair`, payload).then(res => {
            console.log(res);
            alert('finished repair');
            history.push('/');
        });
    }

    return (
        <div>
            <h1>Update Repair</h1>
            <div 
                style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5%'
                }}>
                <TextField
                    id="outlined-basic"
                    label="Labor Charge"
                    name="Labor-Charge"
                    inputRef={laborChargeRef}
                    style={{ marginBottom: '2%' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateLaborCharge}
                >
                    Update Labor Charge
                </Button>
                <p>{laborChargeMsg}</p>
            </div>
            <div 
                style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5%'
                }}>
                <TextField
                    id="outlined-basic"
                    label="Part Number"
                    name="Part-Number"
                    inputRef={partNumberRef}
                    style={{ marginBottom: '2%' }}
                />
                 <TextField
                    id="outlined-basic"
                    label="Vendor Name"
                    name="Vendor-Name"
                    inputRef={vendorNameRef}
                    style={{ marginBottom: '2%' }}
                />
                 <TextField
                    id="outlined-basic"
                    label="Quantity"
                    name="Quantity"
                    inputRef={quantityRef}
                    style={{ marginBottom: '2%' }}
                />
                 <TextField
                    id="outlined-basic"
                    label="Price"
                    name="Price"
                    inputRef={priceRef}
                    style={{ marginBottom: '2%' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddPart}
                >
                    Add Part
                </Button>
                <p>{addPartMsg}</p>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5%'
                }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFinishRepair}
                >
                    Finish Repair
                </Button>
            </div>
        </div>
    )
}

export default UpdateRepair
