import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// ACTION CREATORS
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

// THUNK CREATORS
export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products/all')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const initialProducts = {
  allProducts: [],
  selectedProduct: {}
}

// REDUCER
export default function(state = initialProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: action.products}

    case GET_SINGLE_PRODUCT: {
      return {...state, selectedProduct: action.product}
    }
    default:
      return state
  }
}
