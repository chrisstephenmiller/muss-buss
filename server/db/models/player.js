const db = require('../db')
const Sequelize = require('sequelize')

const Player = db.define('player', {
    gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
})

module.exports = Player
