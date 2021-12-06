import React, { useRef, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'

function AddIndividualCustomer() {
    const dlRef = useRef(null)
    const fnRef = useRef(null)
    const lnRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const streetRef = useRef(null)
    const cityRef = useRef(null)
    const stateRef = useRef(null)
    const postcodeRef = useRef(null)
    const [submitMsg, setSubmitMsg] = useState(null)
    const handleSubmitClick=(event)=>{
        event.preventDefault();
        const payload={
            driverLicense: dlRef.current.value,
            firstName: fnRef.current.value,
            lastName: lnRef.current.value,
            emailAddress: emailRef.current.value,
            phoneNumber: phoneRef.current.value,
            streetAddress: streetRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            postcode: postcodeRef.current.value
        }
        axios.post('http://localhost:8080/i-customers',payload).then(res => {
            setSubmitMsg('Customer added!')
        }).catch(error => {
            setSubmitMsg('Customer already exists!');
        });
    }
    return (
        <div>
            <h2>Add Individual Customer</h2>
            <div className="input__section">
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Driver License"
                        name="driver-license"
                        inputRef={dlRef}
                        style={{
                            marginLeft: '30%',
                            marginBottom: '5px',
                            marginTop: '5%',
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Firstname"
                        name="firstname"
                        inputRef={fnRef}
                        style={{ marginLeft: '30%', marginBottom: '5px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Lastname"
                        name="lastname"
                        inputRef={lnRef}
                        style={{ marginLeft: '10%', marginBottom: '5px' }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        name="email"
                        inputRef={emailRef}
                        style={{ marginLeft: '30%', marginBottom: '5px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Phone Number"
                        name="phone-number"
                        inputRef={phoneRef}
                        style={{ marginLeft: '10%', marginBottom: '5px' }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Street Address"
                        name="street-address"
                        inputRef={streetRef}
                        style={{ marginLeft: '30%', marginBottom: '5px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="City"
                        name="city"
                        inputRef={cityRef}
                        style={{ marginLeft: '10%', marginBottom: '5px' }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="State"
                        name="state"
                        inputRef={stateRef}
                        style={{ marginLeft: '30%', marginBottom: '5px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Postcode"
                        name="postcode"
                        inputRef={postcodeRef}
                        style={{ marginLeft: '10%', marginBottom: '5%' }}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: '40%' }}
                        onClick={handleSubmitClick}
                    >
                        Add Customer
                    </Button>
                    <p>{submitMsg}</p>
                </div>
            </div>
        </div>
    )
}

export default AddIndividualCustomer
