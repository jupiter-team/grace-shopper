const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0.0
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'This is the best tea ever.'
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  status: {
    type: Sequelize.ENUM('available', 'on sale', 'sold out')
  }
})

module.exports = Product
