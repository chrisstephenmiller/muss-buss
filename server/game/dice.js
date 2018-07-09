const DieClass = require('../game/die')

const roll = (gameId, dice) => dice.forEach((die, idx) => { if (!die.held) dice[idx] = new DieClass(gameId, die.id) })

const pointers = dice => {
    const totals = Array(6).fill(0)
    dice.forEach(die => { if (!die.held && !die.scored) totals[die.value - 1]++ })
    dice.forEach(die => { if (die.value === 1 || die.value === 5 || totals[die.value - 1] > 2 || totals.every(total => total === 1)) die.pointer = true })
    dice.forEach(die => { 
        if (die.held) die.scored = true 
    })
}

class Dice {

    constructor(gameId, dice) {

        this.dice = dice || Array(6).fill(new DieClass(gameId, null, 0))
        this.gameId = gameId
        this.turnId = gameId


        if (dice) {
            roll(gameId, dice)
            pointers(dice)
        }
    }

}

module.exports = Dice