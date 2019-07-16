const Player = require('./player')
const Deck = require('./deck')
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
            this.players = players.map(player => new Player(null, player.name || player.email.slice(0, player.email.indexOf('@')), player.id))
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
                const scores = this.players.filter(player => player.id !== this._player().id).map(player => player.score)
                const highScore = Math.max(...scores)
                const leaders = this.players.filter(player => player.score === highScore)
                const negativeTurn = new Turn
                negativeTurn.score = Math.max(-2500, -highScore)
                leaders.forEach(leader => {
                    leader.turns[0] = negativeTurn
                    leader.turns.unshift(null)
                    leader._calcScore()
                })
            }
            if (this.prevTurn) {
                if (this.prevTurn._card().fill) this.prevTurn._roll().dice = null
                if (this.prevTurn._card().bust) this.prevTurn = null
            }
            const cardType = this.deck.draw() || this.deck.shuffle()
            const inheritance = this.prevTurn && this.prevTurn.score
            this._player()._drawCard(cardType, inheritance)
            if (this._card().type === 'noDice') {
                const noRoll = new Roll
                noRoll.dice = []
                this._card().rolls.unshift(noRoll)
                this._card().bust = true
                this._turn().score = this._turn().impunity
                this.stopTurn()
            }
        }
        return this
    }

    _invalidDraw() {
        if (this._card()) {
            const unfulfilled = this._card().fill && !this._roll().dice.every(die => die.held)
            const cardNotVengeange = !(this._card().type === 'vengeance' && !this._roll())
            return cardNotVengeange && (!this._roll() || !this._card().fill || ['mussBuss', 'doubleTrouble'].includes(this._card().type) || unfulfilled)
        } else return this._player().winner
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
        const leaderVengeance = this._card() && this._card().type === 'vengeance' && !this.players.some(player => player.score > this._player().score)
        const fillNotMussBussOrDoubleTrouble = this._card() && this._card().fill && !['mussBuss', 'doubleTrouble'].includes(this._card().type)
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
        if (this._invalidHold(dieId)) this.error = ('Invalid hold.')
        else {
            const dieValue = dieId >= 0 && dieId < 6 ? this._roll().dice[dieId].value : null
            const diceToHold = [1, 5].includes(dieValue) ? [dieId] : this._roll().dice.filter(die => die.value === dieValue).map(die => die.id)
            this._turn()._holdPointers(dieValue ? diceToHold : [])
        }
        return this
    }

    _invalidHold(dieId) {
        const allHeld = dieId === 6 && this._roll() && this._roll().dice.every(die => die.held || !die.pointer)
        return !this._card() || !this._roll() || allHeld
    }

    stopTurn() {
        if (this._invalidStop()) this.error = ('Invalid stop.')
        else {
            const postVengeance = !this._card().bust && this._card().type === 'vengeance'
            if (postVengeance) {
                const scores = this.players.filter(player => player.id !== this._player().id).map(player => player.score)
                const highScore = Math.max(...scores)
                const leaders = this.players.filter(player => player.score === highScore)
                const negativeTurn = new Turn
                negativeTurn.score = Math.max(-2500, -highScore)
                leaders.forEach(leader => leader.turns.push(negativeTurn))
            }
            this._roll().dice.forEach(die => die.live = false)
            this._calcScores()
            if (this.players.some(player => player.winner) ? this._player().score > this.winTotal : this._player().score >= this.winTotal) {
                this.players.forEach(player => player.winner = player.id === this._player().id)
                this.winTotal = this._player().score
            }
            this.prevTurn = this._turn()
            this._player().turns.unshift(null)
            this.playerIndex = ++this.playerIndex % this.players.length
            if (this._player().winner) this.winner = this._player().name + ' won!'
        }
        return this
    }

    _invalidStop() {
        const noPointer = this._roll() && !this._roll().score && !this._card().bust
        return !this._card() || noPointer || this._invalidCardStop()
    }

    _invalidCardStop() {
        const cantStop = ['mussBuss', 'doubleTrouble'].includes(this._card().type) && !this._card().bust
        const mustFill = ['vengeance', 'fill1000', 'doubleTrouble!'].includes(this._card().type) && this._card().fill === this._card().bust
        const noRollNotNoDice = !this._roll() && this._card().type !== 'noDice'
        return mustFill || noRollNotNoDice || cantStop
    }

    passTurn() {
        if (this._invalidPass()) this.error = ('Invalid pass.')
        else this.prevTurn = null
    }

    _invalidPass() {
        const noInheritance = !!this._card() || !this.prevTurn || !this.prevTurn.score || this.prevTurn._card().type === 'mussBuss'
        return noInheritance
    }

    _calcScores() {
        this.players.forEach(player => player._calcScore())
    }

    _invalidActions() {
        return {
            invalidDraw: this._invalidDraw(),
            invalidRoll: this._invalidRoll(),
            invalidHold: this._invalidHold(6),
            invalidStop: this._invalidStop(),
            invalidPass: this._invalidPass()
        }
    }

    _player() { return this.players[this.playerIndex] }

    _turn() { return this._player() && this._player()._turn() }

    _card() { return this._turn() && this._turn()._card() }

    _roll() { return this._card() && this._card()._roll() }
}

module.exports = Game