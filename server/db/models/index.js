const Game = require('./game')
const Player = require('./player')
const Die = require('./die')
const User = require('./user')

Game.hasMany(Die, {as: `dice`})
Game.hasMany(Player)

module.exports = {
  User, Die, Player, Game
}
