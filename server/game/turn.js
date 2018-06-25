const Die = require('./die')

class Turn {

    constructor() {
        this.dice = [
            new Die,
            new Die,
            new Die,
            new Die,
            new Die,
            new Die,
        ]

        this.totals = []

        this.status = `live`
    }

    roll() {
        this.dice.forEach(die => die.roll())
        this.totals = this.dice.forEach(die => Array(6).fill(0)[die.value - 1] + 1)
        // this.dice.forEach(die => {
        //     // if (die.value === 1 || die.value === 5)
        // })
    }
}

module.exports = Turn