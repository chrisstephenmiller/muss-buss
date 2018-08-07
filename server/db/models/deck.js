const Sequelize = require('sequelize')
const db = require('../db')

const Deck = db.define('deck', {
  card: {
    type: Sequelize.STRING,
  },
  noDice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 8,
  },
  mussBuss: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 4,
  },
  vengeance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 4,
  },
  doubleTrouble: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
  garden300: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 12,
  },
  garden400: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
  garden500: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 8,
  },
  fill1000: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 6,
  },
})

module.exports = Deck
