const db = require('./db')
const { Game, User, Player } = require('./models')

User.belongsToMany(Game, { through: Player })

module.exports = db
