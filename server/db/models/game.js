const db = require('../db')
const Sequelize = require('sequelize')

const Game = db.define('game', {
    winScore: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

module.exports = Game