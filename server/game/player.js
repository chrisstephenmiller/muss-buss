const Turn = require('./turn')

class Player {
    constructor(player, name, id) {
        if (player) {
            for (const key of Object.keys(player)) this[key] = player[key]
            if (this.turns.length) this.turns[0] = new Turn(this.turns[0])
        } else {
            this.name = name
            this.turns = []
            this.id = id
        }
        this._calcScore()
    }

    _drawCard(cardType, prevScore) {
        if (!this._turn()) this.turns.unshift(new Turn)
        this.turns = this.turns.filter(Boolean)
        this._turn()._drawCard(cardType, prevScore)
        this._calcScore()
    }

    _holdPointers(diceToHold) {
        this._turn()._holdPointers(diceToHold)
        this._calcScore()
    }

    _turn() { return this.turns.length ? this.turns[0] : null }

    _card() { return this._turn() && this._turn()._card() }

    _roll() { return this._card() && this._card()._roll() }

    _calcScore() {
        this.score = this.turns.reduce((total, turn) => {
            if (turn) total += turn.score
            return total
        }, 0)
    }
}

module.exports = Player