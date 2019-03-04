import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchSingleProduct} from '../store/all-products'
import {createNewOrderItem, addOneToOrderItem, createNewOrder} from '../store'

// COMPONENT
class SingleProduct extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleProduct()
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
          <button name={product} type="button" onClick={this.handleAddToCart}>
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
  sendQuantityUpdate: orderItemId => dispatch(addOneToOrderItem(orderItemId)),
  sendNewOrder: (userId, product) => dispatch(createNewOrder(userId, product))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
