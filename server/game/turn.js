const Card = require('./card')

class Turn {
    constructor(turn) {
        if (turn) {
            for (const key of Object.keys(turn)) this[key] = turn[key]
            if (this._card()) this.cards[0] = new Card(this.cards[0])
        } else {
            this.inheritance = 0
            this.cards = []
            this.score = turn ? turn.score : 0
            this.impunity = 0
        }
    }

    _drawCard(cardType, inheritance) {
        this.inheritance = this.inheritance || inheritance || 0
        this.cards.unshift(new Card(null, cardType))
    }

    _rollDice(prevDice) {
        this._card()._rollDice(prevDice)
        if (this._card().bust) this.score = this.impunity
    }

    _holdPointers(diceToHold) {
        this._card()._holdPointers(diceToHold)
        if (this._card().fill) {
            if (this._card().type === 'doubleTrouble') this._drawCard('doubleTrouble!')
            if (this._card().type === 'doubleTrouble!') this.inheritance = this.inheritance * 2
        }
        this._calcScore()
        const earnedImpunity = this._card().fill && ['vengeance', 'doubleTrouble!'].includes(this._card().type)
        if (earnedImpunity || this._card().type === 'mussBuss') this.impunity = this.score
    }

    _calcScore() {
        this.score = this.cards.reduce((total, card) => {
            total += card.score
            return total
        }, this.inheritance )
    }

    _card() { return this.cards.length ? this.cards[0] : null }

    _roll() { return this._card() && this._card()._roll() }
}

module.exports = Turn