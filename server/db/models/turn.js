const db = require('../db')
const Sequelize = require('sequelize')

const Turn = db.define('turn', {
    fill: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    bust: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    stop: {
      type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    inheritance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },

})

module.exports = Turn
