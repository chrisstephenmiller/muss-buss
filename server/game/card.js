const Roll = require('./roll')

class Card {
    constructor(card) {
        if (card) {
            for (const key of Object.keys(card)) this[key] = card[key]
            if (this.rolls.length) this.rolls[0] = new Roll(true, this.rolls[0])
        } else {
            this.fill = false
            this.bust = false
            this.rolls = []
            this.score = 0
        }
    }
    
    _rollDice(prevDice) {
        this.rolls.unshift(new Roll(null, this.rolls.length && !this.fill ? this._roll() : null, prevDice))
        this._calcFillorBust()
    }

    _holdPointers(diceToHold) {
        this._roll()._holdPointers(diceToHold)
        this._calcScore()
        if (this.fill) this._roll().dice.forEach(die => { die.live = false })
    }

    _calcFillorBust() {
        this.fill = !this.bust && this._roll().dice.every(die => die.pointer)
        this.bust = !this.fill && !this._roll().dice.some(die => die.pointer && die.live)
    }

    _roll() { return this.rolls.length ? this.rolls[0] : null }

    _calcScore() { this.score = this.rolls.reduce((total, roll) => {
        total += roll.score
        return total
    }, 0) }
}

module.exports = Card