const Roll = require('./roll')

class Card {
    constructor(card, cardType) {
        if (card) {
            for (const key of Object.keys(card)) this[key] = card[key]
            if (this._roll()) this.rolls[0] = new Roll(true, this.rolls[0])
        } else {
            this.type = cardType
            this.fill = false
            this.bust = false
            this.rolls = []
            this.score = 0
        }
    }

    _rollDice(prevDice) {
        this.rolls.unshift(new Roll(null, this._roll() && !this.fill ? this._roll() : null, prevDice))
        this._calcFillorBust()
    }

    _holdPointers(diceToHold) {
        this._roll()._holdPointers(diceToHold)
        this._calcFillorBust()
        this._calcScore()
    }

    _calcFillorBust() {
        this.fill = !this.bust && this._roll().dice.every(die => die.pointer && die.held)
        this.bust = !this.fill && !this._roll().dice.some(die => die.pointer && die.live)
        if (this.bust) this._roll().dice.forEach(die => die.pointer = false)
    }

    _calcScore(doubleTrouble) {
        this.score = this.rolls.reduce((total, roll) => {
            total += roll.score
            return total
        }, 0)
        if (this._roll().dice.every(die => die.held)) this.score = this._fill(this.score)
        if (doubleTrouble) this.score += doubleTrouble
    }

    _fill(score) {
        switch (this.type) {
            case 'bonus300': return score + 300
            case 'bonus400': return score + 400
            case 'bonus500': return score + 500
            case 'fill1000': return score + 1000
            default: return score
        }
    }
    
    _roll() { return this.rolls.length ? this.rolls[0] : null }
    
}

module.exports = Card