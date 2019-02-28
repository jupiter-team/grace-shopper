import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const GET_ORDER = 'GET_ORDER'
const SUBMIT_ORDER = 'SUBMIT_ORDER'

// INITIAL STATE

const currentOrder = {
  orderItems: []
}

// ACTION CREATORS
const getOrder = order => ({type: GET_ORDER, order})
// do we need the cart information?
const submitOrder = cart => ({type: SUBMIT_ORDER, cart})

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

export const checkout = cart => async dispatch => {
  try {
    const res = await axios.post('/api/orders', cart)
    dispatch(submitOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
export default function(state = currentOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case SUBMIT_ORDER:
      return currentOrder
    default:
      return state
  }
}
