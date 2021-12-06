import { Button } from '@material-ui/core'
import {useHistory} from 'react-router-dom'

function BackToHomeButton() {
    const history=useHistory()
    const handleClick=(event)=>{
        event.preventDefault();
        history.push('/');
    }
    return <Button variant="contained" onClick={handleClick}>Back to Home</Button>;
}

export default BackToHomeButton
