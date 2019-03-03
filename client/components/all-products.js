import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/all-products'

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
              <div className="col-sm-6 col-lg-4" key={product.id}>
                <div className="card">
                  <img src={product.imageUrl} className="card-img-top" />
                  <div className="card-body">
                    <h6>{product.name}</h6>
                    <p>{product.price}</p>
                    <button type="button">Add to Cart</button>
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
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
