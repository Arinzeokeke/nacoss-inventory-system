import React from 'react'
import { Form, Field } from 'react-final-form'
import { required } from '../../util'
import { EquipmentType, Equipment as EquipmentApi } from '../../agent'
import { withRouter } from 'react-router-dom'

class AddEquipment extends React.Component {
  state = { types: [] }
  async componentDidMount() {
    const types = await EquipmentType.index()
    this.setState(state => ({ ...state, types: types }))
  }
  async onFormSubmit(values) {
    console.log(values)
    try {
      const equipment = await EquipmentApi.createBatch({
        equipmentDetails: {
          ...values,
          equipmentTypeId: this.state.types[0].id
        }
      })
      this.props.history.push('/dashboard')
    } catch (err) {
      console.log(err)
    }

    // submit form
  }
  render() {
    return (
      <div className="row">
        <Form
          onSubmit={this.onFormSubmit.bind(this)}
          render={({ handleSubmit, submitting }) => (
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="row">
                <Field name="equipmentTypeId">
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <select {...input}>
                        <option value="" disabled selected>
                          Choose your option
                        </option>
                        {this.state.types.map(k => (
                          <option value={k.id} key={k.id}>
                            {k.name}
                          </option>
                        ))}
                      </select>
                      <label>Equipment Type</label>

                      {meta.error &&
                        meta.touched && (
                          <p className="form-input-hint">{meta.error}</p>
                        )}
                    </div>
                  )}
                </Field>
              </div>
              <div className="row">
                <Field name="excellent" validate={required}>
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <input
                        {...input}
                        id="excellent"
                        type="number"
                        className="validate"
                      />
                      <label htmlFor="excellent">Excellent Condition</label>
                      {meta.error &&
                        meta.touched && (
                          <p className="form-input-hint">{meta.error}</p>
                        )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="row">
                <Field name="good" validate={required}>
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <input
                        {...input}
                        id="good"
                        type="number"
                        className="validate"
                      />
                      <label htmlFor="good">Good Condition</label>
                      {meta.error &&
                        meta.touched && (
                          <p className="form-input-hint">{meta.error}</p>
                        )}
                    </div>
                  )}
                </Field>
              </div>
              <div className="row">
                <Field name="bad" validate={required}>
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <input
                        {...input}
                        id="bad"
                        type="number"
                        className="validate"
                      />
                      <label htmlFor="bad">Bad Condition</label>
                      {meta.error &&
                        meta.touched && (
                          <p className="form-input-hint">{meta.error}</p>
                        )}
                    </div>
                  )}
                </Field>
              </div>
              <div className="row">
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  disabled={
                    submitting || !this.state.types || !this.state.types.length
                  }
                >
                  Add Equipments
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
          )}
        />
      </div>
    )
  }
}

export default withRouter(AddEquipment)
