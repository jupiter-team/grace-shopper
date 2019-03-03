import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cartTotalPrice} from './cart'
import {fetchOrder} from '../store/order'

const cartId = 1

class Checkout extends Component {
  componentDidMount() {
    this.props.getCart(cartId)
  }

  handleConfirm() {
    if (loggedInUser) {
      userCheckout()
    } else {
      guestCheckout(guestInfo)
    }
  }

  render() {
    const {cart, loggedInUser} = this.props

    return (
      <div>
        <h1>Please review the order below:</h1>
        Price(cart)}
        <form>
          <label>
            <input>Address:</input>
          </label>
        </form>
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
    getCart: orderId => dispatch(fetchOrder(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
