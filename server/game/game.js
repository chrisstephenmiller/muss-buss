const Player = require('./player')
const Deck = require('./Deck')
const Turn = require('./turn')
const Roll = require('./roll')

class Game {
    constructor(game, winTotal, players) {
        if (game) {
            for (const key of Object.keys(game)) this[key] = game[key]
            if (this.prevTurn) this.prevTurn = new Turn(this.prevTurn)
            this.players = this.players.map(player => new Player(player))
            this.deck = new Deck(this.deck)
        } else {
            this.winTotal = winTotal
            this.currentPlayer = 0
            this.players = players.map(player => new Player(null, player.name, player.id))
            this.deck = new Deck
            this.prevTurn = null
        }
    }

    drawCard() {
        if (this.prevTurn && this.prevTurn._card().bust) {
            this.prevTurn._roll().dice = null
            this.prevTurn.score = 0
        }
        if (this._invalidDraw()) this.error = ('Invalid draw.')
        else {
            const draw = this.deck.draw()
            const cardType = draw ? draw : this.deck.shuffle()
            if (this.prevTurn && this._card() && this._card().fill) this.prevTurn._roll().dice = null
            this._player()._drawCard(cardType, this.prevTurn && this.prevTurn.score)
            if (this._card().type === 'noDice') {
                console.log('noDice')
                const noRoll = new Roll
                noRoll.dice = []
                this._card().rolls.unshift(noRoll)
                this._card().bust = true
                this._turn().score = 0
                this.stopTurn()
            }
        }
        if (this.prevTurn && (!this._card() || (this._card().type !== 'vengeance'))) this.prevTurn.score = 0
        return this
    }

    _invalidDraw() {
        if (this._card()) {
            const unfulfilled = this._card().fill && !this._roll().dice.every(die => die.held)
            return !(this._card() && !this._roll() && this._card().type === 'vengeance') && (!this._roll() || !this._card().fill || this._card().type === 'mussBuss' || unfulfilled)
        }
    }

    rollDice() {
        if (this._invalidRoll()) this.error = 'Invalid roll.'
        else {
            this._card()._rollDice(this.prevTurn && this.prevTurn._roll().dice)
            if (this._card().fill) {
                if (this._card().type === 'vengeance') {
                    const negativeTurn = new Turn
                    const leader = this.players.filter((_, idx) => idx !== this.currentPlayer).reduce((prev, current) => current.score <= prev.score ? prev : current)
                    negativeTurn.score = Math.max(-2500, -leader.score)
                    leader.turns.push(negativeTurn)
                }
                this.prevTurn = this._turn()
            }
            if (this._card() && this._card().bust) {
                if (this._card().type === 'mussBuss') {
                    const extraTurn = new Turn
                    extraTurn.score = this._turn().score
                    this._player().turns.push(extraTurn)
                }
                this._turn().score = this._turn().impunity
                this.stopTurn()
            }
        }
        return this
    }

    _invalidRoll() {
        const leaderVengeance = this._card() && this._card().type === 'vengeance' && !this.players.some(player => player.score > this._player().score - this._turn().score)
        const fillNotMussBuss = this._card() && this._card().fill && this._card().type !== 'mussBuss'
        return !this._card() || this._invalidPointers() ||  leaderVengeance || fillNotMussBuss 
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
            this._roll().dice.forEach(die => {
                die.pointer = die.held && !this._card().bust
                die.live = false
            })
            this.prevTurn = this._turn()
            this._player().turns.unshift(null)
            this.currentPlayer = ++this.currentPlayer % this.players.length
            this._calcScores()
        }
        return this
    }

    _invalidStop() {
        const noPointer = this._roll() && !this._roll().score && !this._card().bust
        return !this._card() || noPointer || this._invalidCardStop()
    }

    _invalidCardStop() {
        const mustFill = ['mussBuss', 'doubleTrouble', 'vengeance', 'fill1000'].includes(this._card().type) && this._card().fill === this._card().bust
        const noRollNotNoDice = !this._roll() && this._card().type !== 'noDice'
        return mustFill || noRollNotNoDice
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

    _player() { return this.players[this.currentPlayer] }

    _turn() { return this._player() && this._player()._turn() }

    _card() { return this._turn() && this._turn()._card() }

    _roll() { return this._card() && this._card()._roll() }

    _calcScores() {
        this.players.forEach(player => {
            player.score = player.turns.reduce((total, turn) => {
                if (turn) total += turn.score
                return total
            }, 0)
        })
    }
}

module.exports = Game