const DieClass = require('../game/die')

const pointers = dice => {
    const totals = Array(6).fill(0)
    dice.forEach(die => { if (die.value > 0 && !die.held && !die.scored) totals[die.value - 1]++ })
    dice.forEach(die => { if (die.value !== 0 && (die.value === 1 || die.value === 5 || totals[die.value - 1] > 2 || !totals.find(total => total !== 1))) die.pointer = true })
}

class Dice {

    constructor(gameId, dice) {

        this.dice = dice || Array(6).fill(new DieClass(gameId, null, 0))
        this.gameId = gameId
        this.turnId = gameId

        pointers(this.dice)
    }

}

module.exports = Dice