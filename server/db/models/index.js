const Game = require('./game')
const Player = require('./player')
const Turn = require('./turn')
const Die = require('./die')
const User = require('./user')

Game.hasMany(Player)
Game.hasOne(Turn)
Turn.hasMany(Die, {as: `dice`})

module.exports = {
  User, Game, Player, Turn, Die
}
