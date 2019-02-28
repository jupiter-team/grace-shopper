/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchOrder} from './order'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {currentOrder: {orderItems: []}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchOrder', () => {
    it('eventually dispatches the GET Order action', async () => {
      const fakeOrder = {memberId: 1, status: 'fulfilled', id: 1}
      mockAxios.onGet('/api/orders/1').replyOnce(200, fakeOrder)
      await store.dispatch(fetchOrder(fakeOrder.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ORDER')
      expect(actions[0].order).to.be.deep.equal(fakeOrder)
    })
  })
})
