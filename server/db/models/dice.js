const Sequelize = require('sequelize')
const db = require('../db')

const Dice = db.define('dice', {
  dice: {
    type: Sequelize.JSON,
    allowNull: false
  },
})

module.exports = Dice