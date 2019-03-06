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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12" />
          <h2 className="shopping-cart-header">
            Please Confirm Your Order Below:
          </h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6">
            {cart.orderItems.map(item => (
              <div className="item" key={item.id}>
                <a>
                  <img className="product-image" src={item.product.imageUrl} />
                  <h4 className="cart-product-name">{item.product.name}</h4>
                </a>
                <p className="cart-product-details">
                  Quantity: {item.quantity}
                </p>
                <p className="cart-product-details">
                  Price: ${item.quantity * item.product.price}
                </p>
                <div>
                  <button type="button" className="cart-btn">
                    Remove Item
                  </button>
                  <button type="button" className="cart-btn">
                    Edit Quantity
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6">
            <h6 className="total">Total: ${cartTotalPrice(cart) || 0}</h6>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6">
            <h2 className="shopping-cart-header">Your Shipping Information:</h2>
            {loggedInUser.id ? (
              <div>
                <h6 className="shipping-information">Name:</h6>{' '}
                <p>{loggedInUser.name}</p>
                <h6 className="shipping-information">Address:</h6>{' '}
                <p>{loggedInUser.address}</p>
                <button
                  type="button"
                  className="checkout-btn"
                  onClick={this.userSubmit}
                >
                  Confirm order
                </button>
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
                  <input
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="address">
                    <small>Address</small>
                  </label>
                  <input
                    name="address"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <button type="submit">Confirm order</button>
              </form>
            )}
          </div>
        </div>
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
