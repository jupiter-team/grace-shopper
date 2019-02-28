import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'

// ACTION CREATORS
const getProducts = products => ({type: GET_PRODUCTS, products})

// THUNK CREATORS
export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products/all')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const initialProducts = []

// REDUCER
export default function(state = initialProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
