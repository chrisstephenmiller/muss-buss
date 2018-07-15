const db = require('../db')
const Sequelize = require('sequelize')

const Game = db.define('game', {
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 10000,
        allowNull: false
    },
    currentPlayer: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
    }
})

module.exports = Game