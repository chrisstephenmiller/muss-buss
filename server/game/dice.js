const DieClass = require('../game/die')

const pointers = dice => {
    const totals = Array(6).fill(0)
    dice.forEach(die => { if (!die.held && !die.scored) totals[die.value - 1]++ })
    console.log(totals)
    dice.forEach((die, idx) => {
        console.log(`idx`, idx + 1, die.value)
        if (die.value !== 0 && (die.value === 1 || die.value === 5 || totals[die.value - 1] > 2 || totals.find(total => total !== 1) < 0)) {
            console.log(`0`, die.value !== 0)
            console.log(`1`, die.value === 1)
            console.log(`5`, die.value === 5)
            console.log(`3x`, totals[die.value - 1] > 2)
            console.log(`straight`, !totals.find(total => total !== 1) < 0)
            die.pointer = true
        }
    })
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