const Sequelize = require('sequelize')
const db = require('../db')

const Deck = db.define('deck', {
  noDice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 8
  },
})

module.exports = Deck
