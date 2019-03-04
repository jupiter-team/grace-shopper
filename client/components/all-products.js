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
        <div className="row">
          {products && products.length ? (
            this.props.products.map(product => (
              <div className="col-sm-6 col-lg-4" key={product.id}>
                <div className="card">
                  <img src={product.imageUrl} className="card-img-top" />
                  <div className="card-body">
                    <span className="product-title">{product.name}</span>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
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
  orderItems: state.cart.orderItems,
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  sendOrder: userId => dispatch(createOrder(userId)),
  sendOrderItem: productId => dispatch(createOrderItem(productId)),
  sendQuantityUpdate: orderItem => dispatch(updateOrderItem(orderItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
