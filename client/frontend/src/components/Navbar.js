import React from 'react'
import { Subscribe } from 'unstated'
import { Link, withRouter } from 'react-router-dom'
import AppContainer from '../containers/AppContainer'

class Navbar extends React.Component {
  async handleLogout() {
    await this.props.appContainer.logout()
    this.props.history.push('/')
  }
  decideLinks() {
    if (!this.props.appContainer.state.user) {
      return (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )
    }
    return (
      <li>
        <a onClick={this.handleLogout.bind(this)}>Log Out</a>
      </li>
    )
  }
  render() {
    console.log(this.props.appContainer)
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            UI Computer Science Inventory
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.decideLinks()}
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(props => (
  <Subscribe to={[AppContainer]}>
    {appContainer => <Navbar appContainer={appContainer} {...props} />}
  </Subscribe>
))
