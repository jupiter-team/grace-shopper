import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const CREATED_ORDER_ITEM = 'CREATED_ORDER_ITEM'
const UPDATED_ORDER_ITEM = 'UPDATED_ORDER'

// ACTION CREATORS
const gotCart = cart => ({type: GOT_CART, cart})

const createdOrderItem = orderItem => ({type: CREATED_ORDER_ITEM, orderItem})

const updatedOrderItem = updatedOrder => ({
  type: UPDATED_ORDER_ITEM,
  updatedOrder
})

// THUNK CREATORS
export const fetchCart = () => async dispatch => {
  try {
    const cart = await axios.get('/api/cart')
    dispatch(gotCart(cart.data))
  } catch (error) {
    console.error(error)
  }
}

export const createOrder = (userId, guestId) => async dispatch => {
  try {
    const res = await axios.post('/api/orders', userId, guestId)
    dispatch(gotOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const createOrderItem = orderItem => async dispatch => {
  try {
    const res = await axios.post('/api/cart/', orderItem)
    dispatch(createdOrderItem(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateOrderItem = orderItem => async dispatch => {
  try {
    const res = await axios.put(`/api/cart/${orderItem.id}`, orderItem)
    dispatch(updatedOrderItem(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const guestCheckout = guestInfo => async dispatch => {
  try {
    const res = await axios.create('/guests', guestInfo)
    const guest = res.data
    dispatch(createOrder(null, guest.id))
  } catch (error) {
    console.error(error)
  }
}

export const userCheckout = () => async dispatch => {
  try {
    const orderToSubmit = await order.put('/cart/submit')
    dispatch(gotOrder(initialCart))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialCart = {
  orderItems: []
}

// REDUCER
export default function(state = initialCart, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart

    case CREATED_ORDER_ITEM:
      return {...state, orderItems: [...state.orderItems, action.orderItem]}

    case UPDATED_ORDER_ITEM:
      return {
        ...state,
        orderItems: state.orderItems.filter(
          orderItem => orderItem.id !== action.id
        )
      }

    default:
      return state
  }
}
