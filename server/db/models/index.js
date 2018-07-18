const Game = require('./game')
const Player = require('./player')
const Turn = require('./turn')
const Die = require('./die')
const User = require('./user')

Game.hasOne(Turn)
Game.hasMany(Player)
Game.hasMany(Die, {as: `dice`})

module.exports = {
  User, Game, Player, Turn, Die
}
