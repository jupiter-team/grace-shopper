import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const CREATED_ORDER = 'CREATED_ORDER'
const CREATED_ORDER_ITEM = 'CREATED_ORDER_ITEM'
const UPDATED_ORDER_ITEM = 'UPDATED_ORDER'

// ACTION CREATORS
const createdOrder = order => ({
  type: CREATED_ORDER,
  order
})

const createdOrderItem = order => ({
  type: CREATED_ORDER_ITEM,
  order
})

const updatedOrderItem = updatedOrder => ({
  type: UPDATED_ORDER_ITEM,
  updatedOrder
})

// THUNK CREATORS
export const createOrder = userId => async dispatch => {
  try {
    const res = await axios.post('/api/orders', userId)
    dispatch(createdOrder(res.data))
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

// INITIAL STATE
const initialCart = {
  orderItems: []
}

// REDUCER
export default function(state = initialCart, action) {
  switch (action.type) {
    case CREATED_ORDER:
      return {}

    case CREATED_ORDER_ITEM:
      return {}

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
