const Card = require('./card')

class Turn {
    constructor(turn) {
        if (turn) {
            for (const key of Object.keys(turn)) this[key] = turn[key]
            if (this.cards.length) this.cards[0] = new Card(this.cards[0])
        } else {
            this.inheritance = 0
            this.cards = []
            this.score = turn ? turn.score : 0
        }
    }

    _drawCard(prevScore) {
        this.inheritance = prevScore
        this.cards.unshift(new Card)
        this._calcScore()
    }

    _holdPointers(diceToHold) {
        this._card()._holdPointers(diceToHold)
        this._calcScore()
    }

    _card() { return this.cards.length ? this.cards[0] : null }

    _roll() { return this._card() && this._card()._roll() }

    _calcScore() { this.score = this.cards.reduce((total, card) => {
        total += card.score
        return total
    }, this.inheritance) }
}

module.exports = Turn