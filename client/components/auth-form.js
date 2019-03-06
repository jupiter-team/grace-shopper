import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const AuthForm = props => {
  const {handleSubmit, error} = props

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="collection-title">Sign In</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            {error && error.response && <div> {error.response.data} </div>}
            <div>
              <button type="submit">Log in</button>
            </div>

            <div>
              <h6 className="sign-up-google">
                <a href="/auth/google">Log in with Google</a>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)

// PROP TYPES
AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

// const AuthForm = props => {
//   const {handleSubmit, error} = props

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">
//             <small>Email</small>
//           </label>
//           <input name="email" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">Log in</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//       <a href="/auth/google">Log in with Google</a>
//     </div>
//   )
// }
