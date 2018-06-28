const User = require('./user')
const Roll = require('./roll')
const Die = require('./die')

Roll.hasMany(Die, {as: `dice`})

module.exports = {
  User, Die, Roll
}
