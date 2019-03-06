import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchSingleProduct} from '../store/all-products'
import {createNewOrderItem} from '../store'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleProduct()
  }

  handleAddToCart() {
    const product = this.props.selectedProduct
    const quantity = this.state.quantity
    this.props.sendNewOrderItem(product.id, quantity)
  }

  handleOnChange(event) {
    this.setState({quantity: Number(event.target.value)})
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
          <span>Quantity: </span>
          <input
            type="number"
            name="quantity"
            min="1"
            max="10"
            onChange={this.handleOnChange}
          />
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
  sendNewOrderItem: (productId, quantity) =>
    dispatch(createNewOrderItem(productId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
