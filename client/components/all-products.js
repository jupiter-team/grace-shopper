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
      <div>
        <h3>All Products</h3>
        {products && products.length ? (
          this.props.products.map(product => (
            <div key={product.id}>
              <img src={product.imageUrl} />
              <p>{product.name}</p>
              <p>{product.price}</p>
              <button type="button">Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products</p>
        )}
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
