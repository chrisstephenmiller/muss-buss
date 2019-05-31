const Player = require('./player')

class Game {
    constructor(game, winTotal, playerNames) {
        if (game) {
            for (const key of Object.keys(game)) this[key] = game[key]
            this.players[this.currentPlayer] = new Player(this.players[this.currentPlayer])
        } else {
            this.winTotal = winTotal
            this.currentPlayer = 0
            this.players = playerNames.map((name, idx) => new Player(null, name, idx))
            this.prevScore = 0
            this.prevDice = null
        }
    }

    drawCard() {
        if (this._invalidDraw()) console.log('Invalid draw.')
        else this._player()._drawCard(this.prevScore)
        this.prevScore = 0
        return this
    }

    _invalidDraw() {
        if (this._card()) {
            const unfulfilled = this._card().fill && !this._roll().dice.every(die => die.held)
            return !this._roll() || !this._card().fill || unfulfilled
        }
    }

    rollDice() {
        if (this._invalidRoll()) console.log('Invalid roll.')
        else {
            this._card()._rollDice(this.prevDice)
            this.prevDice = null
            if (this._card().fill) this.holdPointers()
            if (this._card().bust) {
                this._turn().score = 0
                this._roll().dice = null
                this.stopTurn()
            }
        }
        return this
    }

    _invalidRoll() {
        return !this._card() || this._card().fill || this._invalidPointers()
    }

    _invalidPointers() {
        if (this._roll()) {
            const dice = this._roll().dice
            const heldDice = dice.filter(die => die.held && die.live)
            const noneHeld = !heldDice.length
            const straight = heldDice.length === dice.length
            const heldOffDice = heldDice.filter(die => [2, 3, 4, 6].includes(die.value))
            const heldOffTotals = Array(6).fill(0)
            heldOffDice.forEach(die => heldOffTotals[die.value - 1]++ )
            const invalidHold = heldOffTotals.some(total => total > 0 && total < 3) && !straight
            if (invalidHold) console.log('Invalid pointers.')
            return noneHeld || invalidHold
        }
    }

    holdPointers(dieId) {
        if (this._invalidHold()) console.log('Invalid hold.')
        else {
            const dieValue = dieId >= 0 ? this._roll().dice[dieId].value : null
            const diceToHold = [1,5].includes(dieValue) ? [dieId] : this._roll().dice.filter(die => die.value === dieValue).map(die => die.id)
            this._player()._holdPointers(dieValue ? diceToHold : [])
        }
        return this
    }

    _invalidHold() {
        const filled = this._roll() && this._roll().dice.every(die => die.held)
        return !this._card() || !this._roll() || filled
    }

    stopTurn() {
        if (this._invalidStop()) console.log('Invalid stop.')
        else {
            this.prevScore = this._turn().score
            this.prevDice = this._roll().dice
            this._player().turns.unshift(null)
            this.currentPlayer = ++this.currentPlayer % this.players.length
            this._calcScores()
        }
        return this
    }

    _invalidStop() {
        const noPointer = this._roll() && !this._roll().score && !this._card().bust
        return !this._card() || !this._roll() || noPointer
    }

    passTurn() {
        if (this._invalidPass()) console.log('Invalid pass.')
        else {
            this.prevScore = 0
            this.prevDice = null
        }
    }

    _invalidPass() {
        const drewCard = this._card()
        return drewCard
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