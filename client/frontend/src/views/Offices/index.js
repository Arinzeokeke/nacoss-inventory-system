import React from 'react'
import { Link } from 'react-router-dom'
import { Office } from '../../agent'

class Offices extends React.Component {
  state = {
    offices: []
  }
  async componentDidMount() {
    const offices = await Office.index()
    this.setState(state => ({ ...state, offices }))
  }
  render() {
    return (
      <div>
        <h4> Offices</h4>
        <Table offices={this.state.offices} />

        <div className="fixed-action-btn">
          <Link to="/offices/create" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    )
  }
}

const Table = ({ offices }) => {
  const rows = offices.map(({ id, name, manager }) => {
    const manName = manager
      ? manager.firstName + ' ' + manager.lastName
      : 'None'
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{manName}</td>
      </tr>
    )
  })
  return (
    <table className=" responsive-table highlight">
      <thead>
        <tr>
          <th>Name</th>
          <th>Manager</th>
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  )
}

export default Offices
