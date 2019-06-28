const Die = require('./die')

class Roll {
    constructor(game, roll, prevDice) {
        if (game) {
            this.score = roll ? roll.score : 0
            this.dice = roll.dice
        } else {
            this.score = 0
            if (roll) this.dice = roll.dice
            else this.dice = prevDice ? prevDice : null
            this._rollDice()
        }

    }

    _rollDice() {
        if (this.dice) {
            this.dice = this.dice.map((die, idx) => {
                die.live = false
                return die.held ? die : new Die(idx)
            })
        } else { this.dice = Array(6).fill(null).map((_, idx) => new Die(idx)) }
        this._calcPointers()
    }

    _holdPointers(diceToHold) {
        this.dice.forEach(die => {
            if (die.live && die.pointer) {
                if (!diceToHold.length) die.held = true
                if (diceToHold.includes(die.id)) die.held = !die.held
            }
        })
        this._calcScore()
    }

    _calcPointers() {
        const totals = Array(6).fill(0)
        this.dice.forEach(die => { if (die.live) totals[die.value - 1]++ })
        const isPointer = die => die.value === 1 || die.value === 5 || (totals[die.value - 1] > 2) || totals.every(total => total === 1)
        this.dice.forEach(die => { if (isPointer(die)) die.pointer = true })
    }

    _calcScore() {
        this.score = 0
        const totals = Array(6).fill(0)
        this.dice.forEach(die => { if (die.held && die.live) totals[die.value - 1]++ })
        if (totals.every(total => total === 1)) {
            this.score += 1500
            return this.score
        }
        totals.forEach((total, idx) => {
            if (idx === 0) total > 2 ? this.score += 1000 * (total - 2) : this.score += 100 * total
            else if (idx === 4) total > 2 ? this.score += 500 * (total - 2) : this.score += 50 * total
            else total > 2 && (this.score += (idx + 1) * 100 * (total - 2))
        })
    }
}

module.exports = Roll