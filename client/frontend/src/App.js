import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'unstated'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Offices from './views/Offices'
import Managers from './views/Managers'
import ManagerDetail from './views/Managers/ManagerDetail'
import EquipmentTypes from './views/EquipmentTypes'
import EquipmentTypesDetail from './views/EquipmentTypes/EquipmentTypesDetail'
import AddManager from './views/Managers/AddManager'
import Navbar from './components/Navbar'
import signedOutFallback from './hocs/signedOutFallback'
import AddEquipmentType from './views/EquipmentTypes/AddEquipmentType'
import AddEquipment from './views/Equipment/AddEquipment'
import Equipment from './views/Equipment'
import AddOffice from './views/Offices/AddOffice'

const LoginRedirect = component =>
  signedOutFallback(component, () => <Redirect to="/login" />)

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={LoginRedirect(Dashboard)} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/dashboard"
                  component={LoginRedirect(Dashboard)}
                />
                <Route
                  exact
                  path="/offices"
                  component={LoginRedirect(Offices)}
                />
                <Route
                  exact
                  path="/managers"
                  component={LoginRedirect(Managers)}
                />
                <Route
                  exact
                  path="/managers/create"
                  component={LoginRedirect(AddManager)}
                />
                <Route
                  path="/managers/:id"
                  component={LoginRedirect(ManagerDetail)}
                />
                <Route
                  exact
                  path="/equipment-types"
                  component={LoginRedirect(EquipmentTypes)}
                />
                <Route
                  exact
                  path="/equipment-types/create"
                  component={LoginRedirect(AddEquipmentType)}
                />
                <Route
                  path="/equipment-types/:id"
                  component={LoginRedirect(EquipmentTypesDetail)}
                />
                <Route
                  path="/add-equipment"
                  component={LoginRedirect(AddEquipment)}
                />

                <Route
                  path="/equipments"
                  component={LoginRedirect(Equipment)}
                />

                <Route
                  path="/offices/create"
                  component={LoginRedirect(AddOffice)}
                />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
