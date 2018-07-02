const db = require('../db')
const Sequelize = require('sequelize')

const Game = db.define('game', {
    winScore: {
        type: Sequelize.INTEGER,
        defaultValue: 10000,
        allowNull: false
    },
})

module.exports = Game