import React from 'react'
import queryString from 'query-string'
import values from 'lodash.values'
import { Link } from 'react-router-dom'
import { Equipment as EquipmentApi, Office } from '../../agent'

class Equipment extends React.Component {
  state = { equipments: [] }
  async componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    const filters = {}

    if (values.office) {
      filters.officeId = values.office
    }
    if (values.equipmentType) {
      filters.equipmentTypeId = values.equipmentType
    }

    const equipments = await EquipmentApi.index()

    const offices = await Office.index()
    this.setState(state => ({ ...state, equipments, offices }))
  }

  async handleChange(id, body) {
    //Optimistic state updated
    let index
    index = this.state.equipments.findIndex(eq => eq.id === id)
    const orig = this.state.equipments[index]
    try {
      this.setState(state => {
        state.equipments
        const selected = this.state.equipments[index]
        selected.loading = true
        state.equipments[index] = selected
        return {
          ...state
        }
      })
      //Make API call
      const equip = await EquipmentApi.update(id, body)
      this.setState(state => {
        state.equipments[index] = equip
        return {
          ...state
        }
      })
    } catch (err) {
      // If fails, revert
      this.setState(state => {
        state.equipments[index] = orig
        return {
          ...state
        }
      })
    }
  }
  render() {
    return (
      <div>
        <h4> Equipments</h4>
        <Table
          equipments={this.state.equipments}
          offices={this.state.offices}
          handleChange={this.handleChange.bind(this)}
        />

        <div className="fixed-action-btn">
          <Link to="/add-equipment" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    )
  }
}

class Table extends React.Component {
  handleStatusChange(ev, id) {
    this.props.handleChange(id, { status: ev.target.value })
  }
  handleOfficeChange(ev, id) {
    this.props.handleChange(id, { officeId: ev.target.value })
  }

  renderStatusCol(status, id) {
    const options = ['excellent', 'good', 'bad', 'missing'].map(k => {
      return (
        <option value={k} key={k}>
          {k}
        </option>
      )
    })

    const statusCol = (
      <div className="">
        <select
          className="browser-default"
          onChange={ev => {
            this.handleStatusChange(ev, id)
          }}
          value={status}
        >
          {options}
        </select>
      </div>
    )
    return statusCol
  }

  renderOfficeCol(office, equipmentId) {
    if (!office) {
      office = { id: null }
    }
    const options = this.props.offices.map(({ name, id }) => {
      return (
        <option value={id} key={id}>
          {name}
        </option>
      )
    })

    const officeCol = (
      <div className="">
        <select
          className="browser-default"
          onChange={ev => {
            this.handleOfficeChange(ev, equipmentId)
          }}
          value={office.id}
        >
          {options}
        </select>
      </div>
    )
    return officeCol
  }
  render() {
    const rows = this.props.equipments.map(({ status, id, office }) => {
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{this.renderOfficeCol(office, id)}</td>
          <td>{this.renderStatusCol(status, id)}</td>
        </tr>
      )
    })
    return (
      <table className=" responsive-table highlight">
        <thead>
          <tr>
            <th>UUID</th>
            <th>Allocated to</th>
            <th>Condition</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    )
  }
}

export default Equipment
