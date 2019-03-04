import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart} from '../store'

const Navbar = ({handleClick, isLoggedIn, getCart}) => (
  <nav className="navbar navbar-expand-md navbar-light">
    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/products/all">
            <a className="nav-link" href="#">
              Our Teas
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about">
            <a className="nav-link" href="#">
              About
            </a>
          </Link>
        </li>
      </ul>
    </div>
    <div className="mx-auto order-0">
      <Link to="/">
        <a className="navbar-brand mx-auto" href="#">
          Jupiter Tea
        </a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target=".dual-collapse2"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </div>
    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" />
        <Link to="/cart" onClick={getCart}>
          Cart
        </Link>
        <li className="nav-item">
          {isLoggedIn ? (
            <div>
              <Link to="/">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getCart() {
      dispatch(fetchCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
