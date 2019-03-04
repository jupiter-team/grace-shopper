import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchSingleProduct} from '../store/all-products'
import {
  createNewOrderItem,
  updateQuantityOfOrderItem,
  createNewOrder
} from '../store'

// COMPONENT
class SingleProduct extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleProduct()
  }

  handleAddToCart() {
    const product = this.props.selectedProduct
    const user = this.props.user
    const orderItems = this.props.orderItems

    if (user && orderItems.length) {
      const orderId = this.props.orderItems[0].orderId
      const isExistOrderItem = orderItems.find(
        orderItem => orderItem.productId === product.id
      )
      if (!isExistOrderItem) {
        this.props.sendNewOrderItem(product.id, orderId)
      } else {
        this.props.sendQuantityUpdate(isExistOrderItem.id, orderId)
      }
    } else {
      this.props.sendNewOrder(user.id, product.id)
    }
  }

  render() {
    const product = this.props.selectedProduct

    return (
      <div className="container">
        <div key={product.id}>
          <h3>{product.name}</h3>
          <img
            className="img-fluid"
            alt="Responsive image"
            src={product.imageUrl}
          />
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button type="button" onClick={this.handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orderItems: state.cart.orderItems,
  selectedProduct: state.products.selectedProduct
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadSingleProduct: () =>
    dispatch(fetchSingleProduct(ownProps.match.params.productId)),
  sendNewOrderItem: (productId, orderId) =>
    dispatch(createNewOrderItem(productId, orderId)),
  sendQuantityUpdate: (orderItemId, orderId) =>
    dispatch(updateQuantityOfOrderItem(orderItemId, orderId)),
  sendNewOrder: (userId, productId) =>
    dispatch(createNewOrder(userId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
