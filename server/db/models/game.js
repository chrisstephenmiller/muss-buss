const db = require('../db')
const Sequelize = require('sequelize')

const Game = db.define('game', {
    game: {
        type: Sequelize.JSONB,
        allowNull: false
    },
})

module.exports = Game
