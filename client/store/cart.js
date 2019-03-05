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
export const createNewOrderItem = productId => async dispatch => {
  try {
    const res = await axios.post(`/api/cart/item/${productId}`, {
      productId,
      quantity: 1
    })
    dispatch(createdNewOrderItem(res.data))
  } catch (error) {
    console.error(error)
  }
}

// export const updateQuantityOfOrderItem = (
//   orderItemId,
//   orderId
// ) => async dispatch => {
//   try {
//     const res = await axios.put(`/api/cart/item/${orderId}`, {orderItemId})
//     dispatch(updatedOrderItemQuantity(res.data))
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const createNewOrder = (userId, productId) => async dispatch => {
//   try {
//     const res = await axios.post(`/api/cart/order/${userId}`, {
//       status: 'open',
//       userId
//     })
//     const orderId = res.data.id
//     const orderItem = await axios.post(`/api/cart/item/${orderId}`, {
//       productId,
//       orderId,
//       quantity: 1
//     })
//     dispatch(createdNewOrderItem(orderItem.data))
//   } catch (error) {
//     console.error(error)
//   }
// }

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
    // case UPDATED_ITEM_QUANTITY:
    //   return {
    //     ...state,
    //     orderItems: [action.updatedOrderItem].concat(
    //       state.orderItems.filter(
    //         orderItem => orderItem.id !== action.updatedOrderItem.id
    //       )
    //     )
    //   }

    default:
      return state
  }
}
