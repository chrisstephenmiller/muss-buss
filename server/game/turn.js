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

        this.status = `live`
    }

    roll() {
        this.dice.forEach(die => die.roll())
    }
}

module.exports = Turn