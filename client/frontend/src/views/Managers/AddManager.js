import React from 'react'
import { Form, Field } from 'react-final-form'
import { required } from '../../util'
import { withRouter } from 'react-router-dom'
import { Account } from '../../agent'

class AddManager extends React.Component {
  async onFormSubmit(values) {
    console.log(values)
    try {
      const account = await Account.create({
        ...values,
        password: 'astroworld'
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
                <Field name="email" validate={required}>
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <input
                        {...input}
                        id="email"
                        type="email"
                        className=" validate"
                      />
                      <label htmlFor="email">Email</label>
                      {meta.error &&
                        meta.touched && (
                          <p className="form-input-hint">{meta.error}</p>
                        )}
                    </div>
                  )}
                </Field>
              </div>
              <div className="row">
                <Field name="firstName" validate={required}>
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <input
                        {...input}
                        id="firstName"
                        type="text"
                        className="validate"
                      />
                      <label htmlFor="firstName">First Name</label>
                      {meta.error &&
                        meta.touched && (
                          <p className="form-input-hint">{meta.error}</p>
                        )}
                    </div>
                  )}
                </Field>
              </div>
              <div className="row">
                <Field name="lastName" validate={required}>
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <input
                        {...input}
                        id="lastName"
                        type="text"
                        className="validate"
                      />
                      <label htmlFor="lasstName">Last Name</label>
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
                  Add Manager
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

export default withRouter(AddManager)
