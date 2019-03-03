import axios from 'axios'
// import history from '../history'

// ACTION TYPES
// const  = 'FIND_OR_CREATE_CART'

// // ACTION CREATORS
// const  = product => ({
//   type: FIND_OR_CREATE_CART,
//   product
// })

// THUNK CREATORS
// export const createNewOrderItem = (productId, orderId) => {
//   async dispatch => {
//     try {
//       const res = await axios.post(`/api/cart`, productId, orderId)
//       dispatch(created(res.data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// INITIAL STATE
const initialCart = {
  orderItems: []
}

// REDUCER
export default function(state = initialCart, action) {
  switch (action.type) {
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
