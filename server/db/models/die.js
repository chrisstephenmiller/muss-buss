const Sequelize = require('sequelize')
const db = require('../db')

const Die = db.define('die', {
  value: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pointer: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  held: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  scored: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  placeId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rollId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, { tableName: `dice` })

module.exports = Die