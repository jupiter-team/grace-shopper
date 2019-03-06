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
        <div className="row">
          <div className="col-sm-12 col-md-7">
            <div key={product.id}>
              <img
                className="img-fluid"
                alt="Responsive image"
                src={product.imageUrl}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-5">
            <h2 className="product-title">{product.name}</h2>
            <div className="product-divider" />
            <p className="product-price">${product.price}</p>
            <p className="description">{product.description}</p>
                <span>Quantity: </span>
            <input
              type="number"
              name="quantity"
              min="1"
              max="10"
              onChange={this.handleOnChange}
            />
            <button
              type="button"
              className="add-to-cart"
              onClick={this.handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
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
