import React from 'react'
import { Form, Field } from 'react-final-form'
import { withRouter } from 'react-router-dom'
import { required } from '../../util'
import { EquipmentType } from '../../agent'

class AddEquipmentType extends React.Component {
  async onFormSubmit(values) {
    console.log(values)
    try {
      const equipmentType = await EquipmentType.create(values)
      this.props.history.push('/equipment-types')
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div className="row">
        <Form
          onSubmit={this.onFormSubmit.bind(this)}
          render={({ handleSubmit, submitting }) => (
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="row">
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <input
                        {...input}
                        id="name"
                        type="text"
                        className="validate"
                      />
                      <label htmlFor="name">Equipment Type Name</label>
                      {meta.error &&
                        meta.touched && (
                          <p className="form-input-hint">{meta.error}</p>
                        )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="row">
                <Field name="description" validate={required}>
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <input
                        {...input}
                        id="description"
                        type="text"
                        className="validate"
                      />
                      <label htmlFor="name">Equipment Type Description</label>
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
                  disabled={submitting}
                >
                  Add Equipment Type
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

export default withRouter(AddEquipmentType)
