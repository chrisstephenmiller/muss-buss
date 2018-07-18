const DieClass = require('../game/die')

const roll = (gameId, dice, turn) => dice.forEach((die, idx) => { if (!die.held || turn.fill || turn.bust) dice[idx] = new DieClass(gameId, die.id) })
const stop = (gameId, dice) => dice.forEach((die, idx) => { dice[idx] = new DieClass(gameId, die.id, 0) })

const pointers = dice => {
  const totals = Array(6).fill(0)
  dice.forEach(die => { if (!die.held) totals[die.value - 1]++ })
  dice.forEach(die => {
    if (die.value === 1 || die.value === 5 || totals[die.value - 1] > 2 || totals.every(total => total === 1)) die.pointer = true
    if (die.held) {
      die.scored = true
      die.pointer = false
    }
  })
}

class Dice {

  constructor(gameId, dice, turn) {

    if (dice) {
      if (!turn.pass) roll(gameId, dice, turn)
      if (turn.pass && turn.stop & !turn.bust) stop(gameId, dice)
      pointers(dice)
    }

    this.dice = dice || Array(6).fill(new DieClass(gameId, null, 0))
    this.gameId = gameId

    if (this.dice.every(die => die.pointer || die.scored)) this.dice.forEach(die => { die.held = true })
  }

}

module.exports = Dice
