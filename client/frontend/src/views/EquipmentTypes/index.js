import React from 'react'
import values from 'lodash.values'
import { Link } from 'react-router-dom'
import { EquipmentType } from '../../agent'

class EquipmentTypes extends React.Component {
  state = { types: [] }
  async componentDidMount() {
    if (!this.props.types) {
      const typesStat = await EquipmentType.getAllEquipmentTypes()

      this.setState(state => ({ ...state, types: values(typesStat) }))
    }
  }
  render() {
    const types = this.props.types ? this.props.types : this.state.types
    return (
      <div>
        <h4> Equipment Types {this.props.extarText}</h4>
        <Table types={types} />

        <div className="fixed-action-btn">
          <Link
            to="/equipment-types/create"
            className="btn-floating btn-large red"
          >
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    )
  }
}

const Table = ({ types }) => {
  const rows = types.map(
    ({
      excellent,
      good,
      bad,
      missing,
      total,
      detail: { id, name, description }
    }) => {
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{description}</td>
          <td>{excellent}</td>
          <td>{good}</td>
          <td>{bad}</td>
          <td>{missing}</td>
          <td>{total}</td>
          <td>
            <Link
              className="btn-floating waves-effect waves-light"
              to="/add-equipment"
            >
              Add
              <i className="material-icons right">add</i>
            </Link>
          </td>
        </tr>
      )
    }
  )
  return (
    <table className=" responsive-table highlight">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Excellent</th>
          <th>Good</th>
          <th>Bad</th>
          <th>Missing</th>
          <th>Total</th>
          <th> Action </th>
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  )
}
export default EquipmentTypes
