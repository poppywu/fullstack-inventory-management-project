import React, { useRef, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'

function AddBusinessCustomer() {
    const tinRef = useRef(null)
    const bnRef = useRef(null)
    const pcnRef = useRef(null)
    const pctRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const streetRef = useRef(null)
    const cityRef = useRef(null)
    const stateRef = useRef(null)
    const postcodeRef = useRef(null)
    const [submitMsg, setSubmitMsg] = useState(null)
    const handleSubmitClick=(event)=>{
        event.preventDefault()
        const payload={
            tin:tinRef.current.value,
            businessName:bnRef.current.value,
            primaryContactName:pcnRef.current.value,
            primaryContactTitle:pctRef.current.value,
            emailAddress:emailRef.current.value,
            phoneNumber:phoneRef.current.value,
            streetAddress:streetRef.current.value,
            city:cityRef.current.value,
            state:stateRef.current.value,
            postcode:postcodeRef.current.value
        }
        axios.post('http://localhost:8080/b-customers',payload).then(res => {
            setSubmitMsg('Customer added!')
        }).catch(error => {
            setSubmitMsg('Customer already exists!');
        });
    }
    return (
        <div>
            <h2>Add Business Customer</h2>
            <div style={{textAlign:'center'}}>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="TIN"
                        name="tin"
                        inputRef={tinRef}
                        style={{
                            marginBottom: '5px',
                            marginTop: '5%',
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Business Name"
                        name="business-name"
                        inputRef={bnRef}
                        style={{  marginBottom: '5px',marginRight:'10px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Primary Contact Name"
                        name="primary-contact-name"
                        inputRef={pcnRef}
                        style={{ marginBottom: '5px',marginRight:'10px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Primary Contact Title"
                        name="primary-contact-title"
                        inputRef={pctRef}
                        style={{  marginBottom: '5px' }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        name="email"
                        inputRef={emailRef}
                        style={{  marginBottom: '5px',marginRight:'10px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Phone Number"
                        name="phone-number"
                        inputRef={phoneRef}
                        style={{  marginBottom: '5px' }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Street Address"
                        name="street-address"
                        inputRef={streetRef}
                        style={{ marginBottom: '5px',marginRight:'10px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="City"
                        name="city"
                        inputRef={cityRef}
                        style={{ marginBottom: '5px' }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="State"
                        name="state"
                        inputRef={stateRef}
                        style={{ marginBottom: '5px',marginRight:'10px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Postcode"
                        name="postcode"
                        inputRef={postcodeRef}
                        style={{ marginBottom: '5%' }}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
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

export default AddBusinessCustomer
