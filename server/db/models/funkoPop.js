const Sequelize = require('sequelize')
const db = require('../db')


const FunkoPop = db.define('FunkoPop', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.TEXT,
        defaultValue:
            'data:image/png;base64,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'
    },
    size: {
        type: Sequelize.ENUM('regular', 'mini', 'jumbo')
    },
    edition: {
        type: Sequelize.ENUM('limited', 'exclusive', 'general')
    },
    description: {
        type: Sequelize.TEXT('long')
    },
    qtyForCart: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

module.exports = FunkoPop

