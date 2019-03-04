import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOrder, checkout} from '../store/order'

export const cartTotalPrice = cart => {
  return cart.orderItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.product.price,
    0
  )
}

// We are currently setting dummy cartId but will later connect to user.
const cartId = 1

class Cart extends Component {
  constructor() {
    super()

    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    this.props.getCart(cartId)
  }

  handleCheckout() {
    this.props.checkout(this.props.cart)
  }

  render() {
    let cart
    //We are checking to see if there is a user logged in.
    if (this.props.user.id) {
      cart = this.props.cart
    } else {
      //We will get cart from session (this will be changed soon!)
      cart = {
        orderItems: []
      }
    }

    return (
      <div className="cart-page">
        Welcome To Your Cart!
        <div className="items-list">
          Your items:
          {cart.orderItems.map(item => (
            <div className="item" key={item.id}>
              <a>
                <img src={item.product.imageUrl} />
                <h4>{item.product.name}</h4>
              </a>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.quantity * item.product.price}</p>
              <button type="button">Remove Item</button>
              <button type="button">Edit Quantity</button>
            </div>
          ))}
        </div>
        Total Price: {cartTotalPrice(cart) || 0}
        <button type="button">Remove All</button>
        <button type="submit" onClick={this.handleCheckout}>
          Checkout
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.currentOrder,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: orderId => dispatch(fetchOrder(orderId)),
    checkout: cart => dispatch(checkout(cart))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
