import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_ORDER = 'GET_ORDER'

// INITIAL STATE

const currentOrder = {
  orderItems: []
}

// ACTION CREATORS
const getOrder = order => ({type: GET_ORDER, order})

// THUNK CREATORS
export const fetchOrder = orderId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${orderId}`)
    dispatch(getOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
export default function(state = currentOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
