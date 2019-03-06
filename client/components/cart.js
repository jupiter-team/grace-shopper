import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart} from '../store'

export const cartTotalPrice = cart => {
  return cart.orderItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.product.price,
    0
  )
}

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    const cart = this.props.cart
    return (
      <div className="cart-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12" />
            <h2 className="shopping-cart-header">Shopping Cart</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6">
              {cart.orderItems.map(item, idx => (
                <div className="item" key={idx}>
                  <a>
                    <img
                      className="product-image"
                      src={item.product.imageUrl}
                    />
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
              <Link to="/cart/checkout">
                <button type="submit" className="checkout-btn">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
