import React, {Component} from 'react'

class Cart extends Component {
  render() {
    const cart = {
      id: 1,
      status: 'open',
      createdAt: '2019-02-27T17:29:16.499Z',
      updatedAt: '2019-02-27T17:29:16.499Z',
      userId: null,
      guestId: null,
      orderItems: [
        {
          id: 1,
          quantity: 3,
          createdAt: '2019-02-27T17:29:16.517Z',
          updatedAt: '2019-02-27T17:29:16.517Z',
          productId: 1,
          orderId: 1
        },
        {
          id: 3,
          quantity: 1,
          createdAt: '2019-02-27T17:29:16.517Z',
          updatedAt: '2019-02-27T17:29:16.517Z',
          productId: 5,
          orderId: 1
        },
        {
          id: 2,
          quantity: 3,
          createdAt: '2019-02-27T17:29:16.517Z',
          updatedAt: '2019-02-27T17:29:16.517Z',
          productId: 1,
          orderId: 1
        }
      ]
    }

    return <div className="cart-page">Welcome To Your Cart!</div>
  }
}
