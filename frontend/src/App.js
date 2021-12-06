import Home from './Home'
import VehicleDetail from './vehicle/VehicleDetail'
import CreateRepair from './repair/CreateRepair'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SelectAddVehicleType from './vehicle/SelectAddVehicleType'
import AddVehicle from './vehicle/AddVehicle'
import CreateSale from './sale/CreateSale'
import Report from './report/Report'
import AddBusinessCustomer from './customer/AddBusinessCustomer'
import AddIndividualCustomer from './customer/AddIndividualCustomer'
import UpdateRepair from './repair/UpdateRepair'
const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/vehicles/:id">
                    <VehicleDetail />
                </Route>
                <Route path="/create-repair">
                    <CreateRepair />
                </Route>
                <Route path="/vehicles/:id/create-sale">
                    <CreateSale />
                </Route>
                <Route path="/select-add-vehicle-type">
                    <SelectAddVehicleType />
                </Route>
                <Route path="/add-vehicle/car">
                    <AddVehicle type="Car" />
                </Route>
                <Route path="/add-vehicle/convertible">
                    <AddVehicle type="Convertible" />
                </Route>
                <Route path="/add-vehicle/suv">
                    <AddVehicle type="SUV" />
                </Route>
                <Route path="/add-vehicle/truck">
                    <AddVehicle type="Truck" />
                </Route>
                <Route path="/add-vehicle/van">
                    <AddVehicle type="Van" />
                </Route>
                <Route path="/report">
                    <Report />
                </Route>
                <Route path="/add-individual-customer">
                    <AddIndividualCustomer />
                </Route>
                <Route path="/add-business-customer">
                    <AddBusinessCustomer />
                </Route>
                <Route path="/update-repair" component={UpdateRepair}>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
