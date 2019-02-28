import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/order'

const cartTotalPrice = cart => {
  return cart.orderItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.product.price,
    0
  )
}

class Cart extends Component {
  componentDidMount() {
    console.log(this.props.user)
    this.props.getCart(2)
  }
  render() {
    if (this.props.user.id) {
      const cart = this.props.cart
    } else {
      //We will get cart from session (this will be changed soon!)
      const cart = {
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
        <button type="button">Checkout</button>
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
    getCart: orderId => dispatch(fetchOrder(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
