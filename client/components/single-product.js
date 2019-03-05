import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchSingleProduct} from '../store/all-products'
import {createNewOrderItem} from '../store'

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
    this.props.sendNewOrderItem(product.id)
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
  selectedProduct: state.products.selectedProduct
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadSingleProduct: () =>
    dispatch(fetchSingleProduct(ownProps.match.params.productId)),
  sendNewOrderItem: productId => dispatch(createNewOrderItem(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
