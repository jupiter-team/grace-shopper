import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const CREATED_NEW_ORDERITEM = 'CREATED_NEW_ORDERITEM'

// ACTION CREATOR
const createdNewOrderItem = orderItem => ({
  type: CREATED_NEW_ORDERITEM,
  orderItem
})

// THUNK CREATORS
export const createNewOrderItem = (productId, orderId) => async dispatch => {
  try {
    const res = await axios.post('/api/cart', {productId, orderId})
    dispatch(createdNewOrderItem(res.data))
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
    case CREATED_NEW_ORDERITEM:
      return {
        ...state,
        orderItems: [...state.orderItems, action.orderItem]
      }

    default:
      return state
  }
}
