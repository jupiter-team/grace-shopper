import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cartTotalPrice} from './cart'
import {fetchOrder, userCheckout, guestCheckout} from '../store/cart'

const cartId = 1

class Checkout extends Component {
  componentDidMount() {
    this.props.getCart(cartId)
  }

  userSubmit() {
    userCheckout()
  }

  guestSubmit() {
    guestCheckout(guestInfo)
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
        {loggedInUser ? (
          <div>
            Name: {loggedInUser.name}
            Address: {loggedInUser.address}
            <button onClick={userSubmit}>Confirm order</button>
          </div>
        ) : (
          <form onSubmit={guestSubmit}>
            <div>
              <label htmlFor="name">
                <small>Name</small>
              </label>
              <input name="name" type="text" />
            </div>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div>
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <input name="address" type="text" />
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
    cart: state.currentOrder,
    loggedInUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: orderId => dispatch(fetchOrder(orderId)),
    userCheckout: () => dispatch(userCheckout()),
    guestCheckout: guestInfo => dispatch(userCheckout(guestInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
