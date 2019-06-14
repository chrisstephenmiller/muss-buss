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
        this.inheritance = inheritance
        this.cards.unshift(new Card(null, cardType))
    }

    _rollDice(prevDice) {
        this._card()._rollDice(prevDice)
        if (this._card().bust) this.score = this.impunity
    }

    _holdPointers(diceToHold) {
        this._card()._holdPointers(diceToHold)
        this._calcScore()
        const vengeanceOrDoubleTrouble = ['vengeance', 'doubleTrouble!'].includes(this._card().type) && this._roll().dice.every(die => die.held)
        if (this._card().type === 'mussBuss' || vengeanceOrDoubleTrouble) this.impunity = this.score
    }

    _calcScore() {
        this.score = this.cards.reduce((total, card) => {
            total += card.score
            return total
        }, this.inheritance)
    }

    _card() { return this.cards.length ? this.cards[0] : null }

    _roll() { return this._card() && this._card()._roll() }
}

module.exports = Turn