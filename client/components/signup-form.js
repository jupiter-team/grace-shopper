import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'

const SignupForm = props => {
  const {handleSubmit, error} = props

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="collection-title">Create An Account</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <small>Name</small>
              </label>
              <input name="name" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <input name="address" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="dob">
                <small>Date of Birth</small>
              </label>
              <input name="dob" type="date" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" className="form-control" />
            </div>

            <div>
              <button type="submit">Sign up</button>
            </div>

            {error && error.response && <div> {error.response.data} </div>}

            <div>
              <h6 className="sign-up-google">
                <a href="/auth/google">Sign up with Google</a>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const name = evt.target.name.value
      const email = evt.target.email.value
      const address = evt.target.address.value
      const dob = evt.target.dob.value
      const password = evt.target.password.value
      dispatch(signup(name, email, address, dob, password))
    }
  }
}

export default connect(mapSignup, mapDispatch)(SignupForm)

// PROP TYPES
SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
