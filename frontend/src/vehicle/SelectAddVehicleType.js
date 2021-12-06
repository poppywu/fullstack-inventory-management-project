import { useState } from 'react'
import { vehicleType } from '../data'
import {
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    Button,
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import BackToHomeButton from '../navigation/BackToHomeButton'

function SelectAddVehicleType() {
    const [type, setType] = useState('Car')
    const history=useHistory();
    const handleTypeChange = (event) => {
        setType(event.target.value)
    }
    const handleCreateVehicleClick=(event)=>{
        event.preventDefault()
        if(type==='Car'){
            history.push('/add-vehicle/car')
        }else if(type==='Convertible'){
            history.push('/add-vehicle/convertible')
        }else if(type==='Truck'){
            history.push('/add-vehicle/truck')
        }else if(type==='Van'){
            history.push('/add-vehicle/van')
        }else{
            history.push('/add-vehicle/suv')
        }
    }
    return (
        <div>
            <BackToHomeButton />
            <div style={{ textAlign: 'center', marginTop: '5%' }}>
                <h2 style={{marginBottom:'2%'}}>Please Select Vehicle Type</h2>
                <div style={{marginBottom:'2%'}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Vehicle Type</FormLabel>
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
                <Button variant="contained" color="primary" onClick={handleCreateVehicleClick}>
                    Create Vehicle
                </Button>
            </div>
        </div>
    )
}

export default SelectAddVehicleType
