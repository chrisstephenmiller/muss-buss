const Player = require('./player')
const Deck = require('./Deck')
const Turn = require('./turn')
const Roll = require('./roll')

class Game {
    constructor(game, winTotal, players) {
        if (game) {
            for (const key of Object.keys(game)) {
                if (key === 'players') this.players = game[key].map(player => new Player(player))
                else if (key === 'deck') this.deck = new Deck(game[key])
                else if (key === 'prevTurn' && game[key]) this.prevTurn = new Turn(game[key])
                else this[key] = game[key]
            }
        } else {
            this.players = players.map(player => new Player(null, player.name, player.id))
            this.playerIndex = 0
            this.deck = new Deck
            this.winTotal = winTotal            
        }
    }

    drawCard() {
        if (this._invalidDraw()) this.error = ('Invalid draw.')
        else {
            const postVengeance = this._roll() && this._card().type === 'vengeance'
            if (postVengeance) {
                const leader = this.players.filter(player => player.id !== game._player().id).reduce((prev, current) => current.score <= prev.score ? prev : current)
                const negativeTurn = new Turn
                negativeTurn.score = Math.max(-2500, -leader.score)
                leader.turns.push(negativeTurn)
                leader._calcScore()
            }
            if (this._card() && this._card().fill) this._turn().inheritance = this._turn().score
            if (this.prevTurn) {
                if (this.prevTurn._card().fill) this.prevTurn._roll().dice = null
                if (this.prevTurn._card().bust) this.prevTurn = null
            }
            const cardType = this.deck.draw() || this.deck.shuffle()
            const inheritance = this.prevTurn ? this.prevTurn.score : 0
            this._player()._drawCard(cardType, inheritance)
            if (this._card().type === 'noDice') {
                const noRoll = new Roll
                noRoll.dice = []
                this._card().rolls.unshift(noRoll)
                this._card().bust = true
                this._turn().score = 0
                this.stopTurn()
            }
        }
        return this
    }

    _invalidDraw() {
        if (this._card()) {
            const unfulfilled = this._card().fill && !this._roll().dice.every(die => die.held)
            const cardNotVengeange = !(this._card().type === 'vengeance' && !this._roll())
            return cardNotVengeange && (!this._roll() || !this._card().fill || ['mussBuss','doubleTrouble'].includes(this._card().type) || unfulfilled)
        }
    }

    rollDice() {
        if (this._invalidRoll()) this.error = 'Invalid roll.'
        else {
            const prevDice = this.prevTurn && this.prevTurn._roll().dice
            this._turn()._rollDice(prevDice)
            if (this.prevTurn) this.prevTurn = null
            if (this._card().bust) {
                if (this._card().type === 'mussBuss') this._turn()._calcScore()
                this.stopTurn()
            }
        }
        return this
    }

    _invalidRoll() {
        const leaderVengeance = this._card() && this._card().type === 'vengeance' && !this.players.some(player => player.score > this._player().score - this._turn().score)
        const fillNotMussBussOrDoubleTrouble = this._card() && this._card().fill && !['mussBuss','doubleTrouble'].includes(this._card().type)
        if (this._card() && this._card().fill && this._card().type == 'doubleTrouble') this._turn().cards[0].type = 'doubleTrouble!'
        return !this._card() || this._invalidPointers() || leaderVengeance || fillNotMussBussOrDoubleTrouble
    }

    _invalidPointers() {
        if (this._roll()) {
            const dice = this._roll().dice
            const heldDice = dice.filter(die => die.held && die.live)
            const noneHeld = !heldDice.length
            const straight = heldDice.length === dice.length
            const heldOffDice = heldDice.filter(die => [2, 3, 4, 6].includes(die.value))
            const heldOffTotals = Array(6).fill(0)
            heldOffDice.forEach(die => heldOffTotals[die.value - 1]++)
            const invalidHold = heldOffTotals.some(total => total > 0 && total < 3) && !straight
            return noneHeld || invalidHold
        }
    }

    holdPointers(dieId) {
        if (this._invalidHold()) this.error = ('Invalid hold.')
        else {
            const dieValue = dieId >= 0 ? this._roll().dice[dieId].value : null
            const diceToHold = [1, 5].includes(dieValue) ? [dieId] : this._roll().dice.filter(die => die.value === dieValue).map(die => die.id)
            this._player()._holdPointers(dieValue ? diceToHold : [])
        }
        return this
    }

    _invalidHold() { return !this._card() || !this._roll() }

    stopTurn() {
        if (this._invalidStop()) this.error = ('Invalid stop.')
        else {
            this._roll().dice.forEach(die => die.live = false)
            this.prevTurn = this._turn()
            this._player().turns.unshift(null)
            this.playerIndex = ++this.playerIndex % this.players.length
            this._calcScores()
        }
        return this
    }

    _invalidStop() {
        const noPointer = this._roll() && !this._roll().score && !this._card().bust
        return !this._card() || noPointer || this._invalidCardStop()
    }

    _invalidCardStop() {
        const cantStop = ['mussBuss', 'doubleTrouble'].includes(this._card().type) && !this._card().bust
        const mustFill = ['vengeance', 'fill1000'].includes(this._card().type) && this._card().fill === this._card().bust
        const noRollNotNoDice = !this._roll() && this._card().type !== 'noDice'
        return mustFill || noRollNotNoDice || cantStop
    }

    passTurn() {
        if (this._invalidPass()) this.error = ('Invalid pass.')
        else this.prevTurn = null
    }

    _invalidPass() {
        const busted = this.prevTurn && this.prevTurn._card().bust
        const drewCard = this._card()
        return drewCard || busted
    }

    _calcScores() {
        this.players.forEach(player => {
            player.score = player.turns.reduce((total, turn) => {
                if (turn) total += turn.score
                return total
            }, 0)
        })
    }

    _player() { return this.players[this.playerIndex] }

    _turn() { return this._player() && this._player()._turn() }

    _card() { return this._turn() && this._turn()._card() }

    _roll() { return this._card() && this._card()._roll() }
}

module.exports = Game