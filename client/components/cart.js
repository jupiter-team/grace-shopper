import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/order'

const cart = {
  id: 1,
  status: 'fulfilled',
  createdAt: '2019-02-27T21:16:55.084Z',
  updatedAt: '2019-02-27T21:16:55.084Z',
  userId: null,
  guestId: null,
  orderItems: [
    {
      id: 1,
      quantity: 3,
      createdAt: '2019-02-27T21:16:55.120Z',
      updatedAt: '2019-02-27T21:16:55.120Z',
      productId: 1,
      orderId: 1,
      product: {
        id: 1,
        name: 'Mint Green Tea',
        price: '8.50',
        description:
          'In Morocco and many other Arab countries, serving mint tea has come to represent a certain lifestyle and the most refined expression of hospitality. Green tea is always used, usually Gunpowder, which is known for its refreshing and thirst quenching qualities. Chinese green tea (Gunpowder) rolled into pearls and flavored with dried mint leaves. Astringent, fresh and thirst quenching.',
        imageUrl:
          'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/1/815-42140-idd04ibnlv.jpg',
        status: 'available',
        createdAt: '2019-02-27T21:16:54.995Z',
        updatedAt: '2019-02-27T21:16:54.995Z'
      }
    },
    {
      id: 2,
      quantity: 1,
      createdAt: '2019-02-27T21:16:55.121Z',
      updatedAt: '2019-02-27T21:16:55.121Z',
      productId: 5,
      orderId: 1,
      product: {
        id: 5,
        name: 'Chai Imperial Black Tea',
        price: '8.50',
        description:
          'Loved by our customers, the Chai n°25 recipes becomes a permanent reference! Inspired by the Indian tradition of spiced tea, Chai Impérial is a delicate black tea pepped up with a generous blend of green cardamom, pink peppercorns, cinnamon, ginger, and orange zest. Full of precious spices, Chai Imperial is a delicious and warm blend which can be prepared nature or with milk like in the Indian tradition.',
        imageUrl:
          'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/7/7/771-34801-v9p8uywm6p.jpg',
        status: 'available',
        createdAt: '2019-02-27T21:16:54.998Z',
        updatedAt: '2019-02-27T21:16:54.998Z'
      }
    },
    {
      id: 4,
      quantity: 3,
      createdAt: '2019-02-27T21:16:55.121Z',
      updatedAt: '2019-02-27T21:16:55.121Z',
      productId: 1,
      orderId: 1,
      product: {
        id: 1,
        name: 'Mint Green Tea',
        price: '8.50',
        description:
          'In Morocco and many other Arab countries, serving mint tea has come to represent a certain lifestyle and the most refined expression of hospitality. Green tea is always used, usually Gunpowder, which is known for its refreshing and thirst quenching qualities. Chinese green tea (Gunpowder) rolled into pearls and flavored with dried mint leaves. Astringent, fresh and thirst quenching.',
        imageUrl:
          'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/1/815-42140-idd04ibnlv.jpg',
        status: 'available',
        createdAt: '2019-02-27T21:16:54.995Z',
        updatedAt: '2019-02-27T21:16:54.995Z'
      }
    }
  ]
}

const cartTotalPrice = cart => {
  return cart.orderItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.product.price,
    0
  )
}

export class Cart extends Component {
  componentDidMount() {
    // this.props.fetchOrder('1')
  }
  render() {
    //   const cart = this.props.cart
    console.log('props cart', this.props.cart)
    return (
      <div className="cart-page">
        Welcome To Your Cart!
        <div className="items-list">
          Your items:
          {cart.orderItems.map(item => (
            <div className="item" key={item.id}>
              <a>
                <img src={item.product.imageUrl} />
                <h4>{item.product.name}</h4>
              </a>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.quantity * item.product.price}</p>
              <button type="button">Remove Item</button>
              <button type="button">Edit Quantity</button>
            </div>
          ))}
        </div>
        Total Price: {cartTotalPrice(cart) || 0}
        <button type="button">Remove All</button>
        <button type="button">Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.currentOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrder: orderId => dispatch(fetchOrder(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
