/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/all', () => {
    const testProduct = {
      name: 'Mint Green Tea',
      price: 8.5,
      description: 'In Morocco and.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/1/815-42140-idd04ibnlv.jpg',
      status: 'available'
    }

    beforeEach(() => {
      return Product.create({
        name: 'Mint Green Tea',
        price: 8.5,
        description: 'In Morocco and.',
        imageUrl:
          'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/1/815-42140-idd04ibnlv.jpg',
        status: 'available'
      })
    })

    it('GET /api/products/all', async () => {
      const res = await request(app)
        .get('/api/products/all')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Mint Green Tea')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
