const calcStatus = (turn, dice) => {
  if (!dice) return
  if (!turn.bust && dice.every(die => die.scored || die.pointer)) turn.fill = true
  if (!turn.fill && !dice.some(die => die.pointer)) turn.bust = true
}

const calcScore = dice => {
  if (!dice) return 0
  let points = 0
  const pointers = Array(6).fill(0)
  dice.forEach(die => { if (die.held && die.pointer) pointers[die.value - 1]++ })
  pointers.forEach((die, idx) => {
    if (idx === 0) {
      die > 2 ? points += 1000 * (die - 2) : points += 100 * die
    } else if (idx === 4) {
      die > 2 ? points += 500 * (die - 2) : points += 50 * die
    } else {
      die > 2 && (points += (idx + 1) * 100 * (die - 2))
    }
  })
  pointers.every(pointer => pointer === 1) && (points = 1500)
  return points
}

class Turn {

  constructor(gameId, turn, dice, roll) {
    this.fill = false
    this.bust = false
    this.gameId = gameId
    this.inheritance = 0
    if (turn) {
      this.inheritance = roll ? turn.score : turn.inheritance
      if (turn.stop) {
        this.stop = false
        this.bust = false
      }
      calcStatus(this, dice)
    }
    this.score = this.inheritance + calcScore(dice)
    if (this.bust) {
      this.score = 0
      this.inheritance = 0
    }
  }

}

module.exports = Turn
