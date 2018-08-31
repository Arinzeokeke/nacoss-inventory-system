import React from 'react'
import { Link } from 'react-router-dom'
import { Account } from '../../agent'

class Managers extends React.Component {
  state = { managers: [] }
  async componentDidMount() {
    try {
      const managers = await Account.getManagers()
      console.log(managers)
      this.setState(state => ({ ...state, managers: managers }))
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div>
        <h4> Managers</h4>
        <Table managers={this.state.managers} />

        <div className="fixed-action-btn">
          <Link to="/managers/create" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    )
  }
}

const Table = ({ managers }) => {
  const tableRows = managers.map(
    ({ id, firstName, lastName, email, offices }) => {
      return (
        <tr key={id}>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td>{offices.map(o => o.name).join(', ')}</td>
          <td>
            <Link to={`/managers/${id}`}>View</Link>
          </td>
        </tr>
      )
    }
  )
  return (
    <table className=" responsive-table highlight">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Office(s) Assigned</th>
          <th> View Detail</th>
        </tr>
      </thead>

      <tbody>{tableRows}</tbody>
    </table>
  )
}

export default Managers
