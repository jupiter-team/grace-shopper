/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: {orderItems: []}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchCART', () => {
    it('eventually dispatches the GOT CART action', async () => {
      const fakeCart = {memberId: 1, status: 'fulfilled', id: 1}
      mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
      await store.dispatch(fetchCart())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeCart)
    })
  })
})
