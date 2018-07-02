const db = require('../db')
const Sequelize = require('sequelize')

const Player = db.define('player', {
    name: {
        type: Sequelize.JSON,
        allowNull: false,
    },
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    
})

module.exports = Player