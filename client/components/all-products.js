import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
        <div className="row">
          {products && products.length ? (
            this.props.products.map(product => (
              <div className="col-sm-6 col-lg-4" key={product.id}>
                <div className="card">
                  <Link to={'/products/' + product.id}>
                    <img src={product.imageUrl} className="card-img-top" />
                  </Link>
                  <div className="card-body">
                    <Link to={'/products/' + product.id}>
                      <span className="product-title">{product.name}</span>
                    </Link>
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
  user: state.user,
  products: state.products.allProducts,
  orderItems: state.cart.orderItems
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
