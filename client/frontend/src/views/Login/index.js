import React from 'react'
import { Form, Field } from 'react-final-form'
import { withRouter } from 'react-router-dom'
import { required } from '../../util'
import { Subscribe } from 'unstated'
import AppContainer from '../../containers/AppContainer'

class Login extends React.Component {
  onFormSubmit(values) {
    console.log(values, this.props.history)
    this.props.appContainer.login(values, this.props.history)
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
                <Field name="password" validate={required}>
                  {({ input, meta }) => (
                    <div className="input-field col s12">
                      <input
                        {...input}
                        id="password"
                        type="password"
                        className="validate"
                      />
                      <label htmlFor="password">Password</label>
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
                  Login
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

export default withRouter(props => (
  <Subscribe to={[AppContainer]}>
    {appContainer => <Login appContainer={appContainer} {...props} />}
  </Subscribe>
))
