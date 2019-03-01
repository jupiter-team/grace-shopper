import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const GET_ORDER = 'GET_ORDER'
const SUBMIT_ORDER = 'SUBMIT_ORDER'
const CREATED_ORDER = 'CREATED_ORDER'
const CREATED_ORDER_ITEM = 'CREATED_ORDER_ITEM'

// ACTION CREATORS
const getOrder = order => ({type: GET_ORDER, order})
const createdOrder = order => ({type: CREATED_ORDER, order})

// THUNK CREATORS
export const fetchOrder = orderId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${orderId}`)
    const order = res.data
    dispatch(getOrder(order))
  } catch (error) {
    console.log(error)
  }
}

export const createOrder = userId => async dispatch => {
  try {
    const res = await axios.post('/api/orders', userId)

    dispatch(createdOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

// export const createOrderItemInDB = (orderItem) => async dispatch => {
//   try {
//     const res = await axios.post('/api/orders', orderItem)
//     dispatch(createdOrderItem(res.data))
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const checkout = cart => async dispatch => {
//   try {
//     const res = await axios.post('/api/orders', cart)
//     dispatch(submitOrder(res.data))
//   } catch (error) {
//     console.error(error)
//   }
// }

// INITIAL STATE

const currentOrder = {
  orderItems: []
}

// REDUCER
export default function(state = currentOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    // case SUBMIT_ORDER:
    //   return currentOrder
    case CREATED_ORDER:
      return {}

    default:
      return state
  }
}
