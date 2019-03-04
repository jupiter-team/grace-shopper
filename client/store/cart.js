import axios from 'axios'

const GOT_CART = 'GOT_CART'

const gotCart = cart => ({type: GOT_CART, cart})

const initialCart = {
  orderItems: []
}

export const fetchCart = () => async dispatch => {
  try {
    const cart = await axios.get('/api/cart')
    dispatch(gotCart(cart.data))
  } catch (error) {
    console.error(error)
  }
}

export default (state = initialCart, action) => {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    default:
      return state
  }
}
