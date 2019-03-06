import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cartTotalPrice} from './cart'
import {fetchCart, userCheckout, guestCheckout} from '../store/cart'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.guestSubmit = this.guestSubmit.bind(this)
    this.userSubmit = this.userSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  userSubmit(event) {
    event.preventDefault()
    this.props.userCheckout()
  }

  guestSubmit(event) {
    event.preventDefault()
    const guestInfo = this.state
    this.props.guestCheckout(guestInfo)
  }

  render() {
    const {cart, loggedInUser} = this.props
    return (
      <div>
        <h1>Please confirm the order below:</h1>
        Your items:
        {cart.orderItems.map(item => (
          <div className="item" key={item.id}>
            <a>
              <img src={item.product.imageUrl} />
              <h4>{item.product.name}</h4>
            </a>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.quantity * item.product.price}</p>
          </div>
        ))}
        Total Price: {cartTotalPrice(cart) || 0}
        <h3>Your Shipping Information:</h3>
        {loggedInUser.id ? (
          <div>
            <p>Name: {loggedInUser.name}</p>
            <p>Address: {loggedInUser.address}</p>
            <button onClick={this.userSubmit}>Confirm order</button>
          </div>
        ) : (
          <form onSubmit={this.guestSubmit}>
            <div>
              <label htmlFor="name">
                <small>Name</small>
              </label>
              <input name="name" type="text" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <input name="address" type="text" onChange={this.handleChange} />
            </div>
            <button type="submit">Confirm order</button>
          </form>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    loggedInUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(fetchCart()),
    userCheckout: () => dispatch(userCheckout()),
    guestCheckout: guestInfo => dispatch(guestCheckout(guestInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
