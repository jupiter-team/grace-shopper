import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchProducts} from '../store/all-products'
import {createNewOrderItem, addOneToOrderItem, createNewOrder} from '../store'

// COMPONENT
class AllProducts extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  handleAddToCart(event) {
    const product = event.target.name
    const user = this.props.user
    const orderItems = this.props.orderItems
    const orderId = this.props.orderItems[0].orderId

    if (user && orderItems.length) {
      const existOrderItem = orderItems.find(
        orderItem => orderItem.productId === product.id
      )
      if (!existOrderItem) {
        this.props.sendNewOrderItem(product.id, orderId)
      } else {
        this.props.sendQuantityUpdate(existOrderItem.id)
      }
    } else {
      this.props.sendNewOrder(user.id, product)
    }
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
                  name={product}
                  type="button"
                  onClick={this.handleAddToCart}
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
  user: state.user,
  orderItems: state.cart.orderItems
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  sendNewOrderItem: (productId, orderId) =>
    dispatch(createNewOrderItem(productId, orderId)),
  sendQuantityUpdate: orderItemId => dispatch(addOneToOrderItem(orderItemId)),
  sendNewOrder: (userId, product) => dispatch(createNewOrder(userId, product))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
