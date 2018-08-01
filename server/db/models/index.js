const Game = require('./game')
const Player = require('./player')
const Turn = require('./turn')
const Die = require('./die')
const Deck = require('./deck')
const User = require('./user')

Game.hasOne(Turn)
Game.hasOne(Deck)
Game.hasMany(Player)
Game.hasMany(Die, {as: `dice`})
User.hasOne(Player)

module.exports = {
  User, Game, Player, Turn, Die, Deck
}
