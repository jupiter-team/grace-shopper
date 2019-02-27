/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/:orderId', () => {
    beforeEach(() => {
      return Order.create({
        memberId: 1,
        status: 'fulfilled'
      })
    })

    it('GET /api/orders/1', async () => {
      const res = await request(app)
        .get('/api/orders/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.status).to.be.equal('fulfilled')
    })
  }) // end describe('/api/orders')
}) // end describe('Order routes')
