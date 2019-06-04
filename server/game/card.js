const Roll = require('./roll')

class Card {
    constructor(card, cardType) {
        if (card) {
            for (const key of Object.keys(card)) this[key] = card[key]
            if (this.rolls.length) this.rolls[0] = new Roll(true, this.rolls[0])
        } else {
            this.type = cardType
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
    }

    _calcFillorBust() {
        this.fill = !this.bust && this._roll().dice.every(die => die.pointer)
        this.bust = !this.fill && !this._roll().dice.some(die => die.pointer && die.live)
    }

    _roll() { return this.rolls.length ? this.rolls[0] : null }

    _calcScore() {
        this.score = this.rolls.reduce((total, roll) => {
            total += roll.score
            return total
        }, 0)
        if (this._roll().dice.every(die => die.held)) this.score = this._fill(this.score)
    }

    _fill(score) {
        if (this.type === 'bonus300') {
            return score + 300
        }
        if (this.type === 'bonus400') {
            return score + 400
        }
        if (this.type === 'bonus500') {
            return score + 500
        }
        if (this.type === 'fill1000') {
            return score + 1000
        }
        if (this.type === 'mussBuss') {
            return score
        }
        if (this.type === 'vengeance') {
            return score
        }
        if (this.type === 'doubleTrouble') {
            return score * 2
        }
    }

}

module.exports = Card