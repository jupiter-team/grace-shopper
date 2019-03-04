import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchProducts} from '../store/all-products'
import {createNewOrderItem, addOneToOrderItem, createNewOrder} from '../store'

// COMPONENT
class AllProducts extends Component {
  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div className="container">
        <h3>All Products</h3>
        <div className="row">
          {products && products.length ? (
            this.props.products.map(product => (
              <div key={product.id}>
                <div className="col-md-4" />
                <Link to={'/products/' + product.id}>
                  <img
                    className="img-fluid"
                    alt="Responsive image"
                    src={product.imageUrl}
                  />
                </Link>
                <h6 className="product-title">
                  <Link to={'/products/' + product.id}>{product.name}</Link>
                </h6>
                <p>{product.price}</p>
                {/* <button
                  name={product}
                  type="button"
                  onClick={this.handleAddToCart}
                >
                  Add to Cart
                </button> */}
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
  products: state.products.allProducts,
  orderItems: state.cart.orderItems
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
