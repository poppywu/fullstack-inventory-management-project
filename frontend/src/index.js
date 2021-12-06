import ReactDOM from 'react-dom'
import { MyContextProvider } from './MyContext'
import App from './App'

ReactDOM.render(
    <MyContextProvider>
        <App />
    </MyContextProvider>,
    document.getElementById('root')
)
