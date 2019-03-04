import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GOT_USER = 'GOT_USER'
const REMOVED_USER = 'REMOVED_USER'

// ACTION CREATORS
const gotUser = user => ({
  type: GOT_USER,
  user
})

const removedUser = () => ({
  type: REMOVED_USER
})

// INITIAL STATE
const initialUser = {}

// THUNK CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(gotUser(res.data || initialUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/login`, {email, password})
  } catch (authError) {
    return dispatch(gotUser({error: authError}))
  }

  try {
    dispatch(gotUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const signup = (
  name,
  email,
  address,
  dob,
  password
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/signup`, {
      name,
      email,
      address,
      dob,
      password
    })
  } catch (authError) {
    return dispatch(gotUser({error: authError}))
  }
  try {
    dispatch(gotUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removedUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = initialUser, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user
    case REMOVED_USER:
      return initialUser
    default:
      return state
  }
}
