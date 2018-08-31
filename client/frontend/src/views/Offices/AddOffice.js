import React from 'react'
import { Form, Field } from 'react-final-form'
import { withRouter } from 'react-router-dom'
import { required } from '../../util'
import { Office } from '../../agent'

class AddOffice extends React.Component {
  async onFormSubmit(values) {
    console.log(values)
    try {
      const equipment = await Office.create(values)
      this.props.history.push('/offices')
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
                      <label htmlFor="name">Office Name</label>
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
                  Add Office
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

export default withRouter(AddOffice)
