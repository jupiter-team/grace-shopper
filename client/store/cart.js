import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const CREATED_NEW_ORDERITEM = 'CREATED_NEW_ORDERITEM'
const UPDATED_ITEM_QUANTITY = 'UPDATED_ITEM_QUANTITY'

// ACTION CREATOR
const gotCart = cart => ({type: GOT_CART, cart})

const createdNewOrderItem = orderItem => ({
  type: CREATED_NEW_ORDERITEM,
  orderItem
})

const updatedOrderItem = updated => ({
  type: UPDATED_ITEM_QUANTITY,
  updated
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

export const createNewOrderItem = (productId, quantity) => async dispatch => {
  try {
    const {data: cart} = await axios.get('/api/cart')
    const isExistItem = cart.orderItems.find(
      orderItem => orderItem.product.id === productId
    )
    console.log('IS EXIST ===> ', isExistItem)
    if (isExistItem) {
      const res = await axios.put(`/api/cart/item/${productId}`, {
        isExistItem,
        quantity
      })
      dispatch(updatedOrderItem(res.data))
    } else {
      const res = await axios.post(`/api/cart/item/${productId}`, {
        productId,
        quantity
      })
      dispatch(createdNewOrderItem(res.data))
    }
  } catch (error) {
    console.error(error)
  }
}

export const guestCheckout = guestInfo => async dispatch => {
  try {
    const res = await axios.post('/api/guests', guestInfo)
    dispatch(gotCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const userCheckout = () => async dispatch => {
  try {
    const res = await axios.put('/api/cart/submit')
    dispatch(gotCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const createNewOrder = (userId, productId) => async dispatch => {
  try {
    const res = await axios.post(`/api/cart/order/${userId}`, {
      status: 'open',
      userId
    })
    const orderId = res.data.id
    const orderItem = await axios.post(`/api/cart/item/${orderId}`, {
      productId,
      orderId,
      quantity: 1
    })
    dispatch(createdNewOrderItem(orderItem.data))
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
    case GOT_CART: {
      return action.cart
    }
    case CREATED_NEW_ORDERITEM:
      return {
        ...state,
        orderItems: [...state.orderItems, action.orderItem]
      }
    case UPDATED_ITEM_QUANTITY:
      return {
        ...state,
        orderItems: [action.updated].concat(
          state.orderItems.filter(
            orderItem => orderItem.id !== action.updated.id
          )
        )
      }
    default:
      return state
  }
}
