import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchProducts} from '../store/all-products'

import {createOrder, createOrderItem, updateOrderItem} from '../store/cart'

// COMPONENT
class AllProducts extends Component {
  constructor() {
    super()
    this.handleAddCart = this.handleAddCart.bind(this)
  }

  handleAddCart(event) {
    const productId = event.target.name
    const orderId = session.cart.orderId

    if (!session.cart) {
      this.props.sendOrder(session.userId)
    } else {
      session.cart.orderItems.forEach(orderItem => {
        if (orderItem.productId === productId) {
          orderItem.quantity++
          this.props.sendQuantityUpdate(orderItem)
        }
      })
      if (session.cart.orderItems) {
        //if there is an orderItem with productId, quantity++
        //else
        //create a new order item with orderId from session.cart
        this.props.sendOrderItem(productId, orderId)
      }
    }
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div className="container">
        <h3>All Products</h3>
        <div className="row">
          {products ? (
            this.props.products.map(product => (
              <div key={product.id}>
                <div className="col-md-4" />
                <img
                  className="img-fluid"
                  alt="Responsive image"
                  src={product.imageUrl}
                />
                <h6 className="product-title">{product.name}</h6>
                <p>{product.price}</p>
                <button
                  name={product.id}
                  type="button"
                  onClick={this.handleAddCart}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products</p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderItems: state.currentOder.orderItems,
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  sendOrder: userId => dispatch(createOrder(userId)),
  sendOrderItem: productId => dispatch(createOrderItem(productId)),
  sendQuantityUpdate: orderItem => dispatch(updateOrderItem(orderItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
