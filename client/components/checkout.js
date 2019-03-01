import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cartTotalPrice} from './cart'
import {fetchOrder} from '../store/order'

const cartId = 1

class Checkout extends Component {
  componentDidMount() {
    this.props.getCart(cartId)
  }
  render() {
    const {cart} = this.props

    return (
      <div>
        <h1>Your order has been submitted!</h1>
        Price(cart)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.currentOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: orderId => dispatch(fetchOrder(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
