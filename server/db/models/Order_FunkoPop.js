const Sequelize = require('sequelize')
const db = require('../db')

const Order_FunkoPop = db.define('order_funkoPop', {

    quantity: {
        type: Sequelize.INTEGER
    },
    
    funkoPrice: {
        type: Sequelize.INTEGER
    }
})

module.exports = Order_FunkoPop