import React from 'react'
import queryString from 'query-string'
import { Account, Office } from '../../agent'

class ManagerDetail extends React.Component {
  state = { manager: {}, offices: [], allOffices: [] }

  async componentDidMount() {
    const values = this.props.match.params.id
    console.log(values)
    const manager = await Account.show(values)
    const offices = await Account.getOffices(values)
    const allOffices = await Office.index()

    this.setState(state => ({ ...state, manager, offices, allOffices }))
  }

  async handleChange(ev) {
    const id = ev.target.value
    try {
      // optimistic move
      const index = this.state.offices.findIndex(office => office.id === id)
      const allIndex = this.state.allOffices.findIndex(
        office => office.id === id
      )

      this.setState(state => {
        if (index >= 0) {
          // remove from offices
          state.offices.splice(index, 1)
          return { ...state }
        }
        state.offices.push(state.allOffices[allIndex])
        return {
          ...state
        }
      })

      //make call
      const updatedOffice = await Office.update(id, {
        managerId: this.state.manager.id
      })
    } catch (err) {
      //if fail move back
    }
  }
  renderOfficeSubs() {
    return this.state.allOffices.map(({ id, name }) => {
      console.log(this.state.offices)
      const checked = this.state.offices.some(v => v.id === id)
      return (
        <div key={id}>
          <label htmlFor={id}>
            <span> {name}</span>
          </label>
          <input
            type="checkbox"
            value={id}
            id={id}
            checked={checked}
            onChange={this.handleChange.bind(this)}
          />
        </div>
      )
    })
  }
  render() {
    const { firstName, lastName, email } = this.state.manager
    return (
      <React.Fragment>
        <p> Name: {firstName + ' ' + lastName}</p>
        <p> Email: {email}</p>

        <form action="#">{this.renderOfficeSubs()}</form>
      </React.Fragment>
    )
  }
}

export default ManagerDetail
