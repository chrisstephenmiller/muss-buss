const Player = require('./player')
const Turn = require('./turn')

class Game {

    constructor(players, winScore) {
        this.players = players.map(player => new Player(player))
        this.currentPlayer = 0
        this.winScore = winScore
    }

    nextTurn(inheritance = 0) {
        const turn = new Turn(inheritance)
        this.currentPlayer++
        this.currentPlayer %= this.players.length
    }

}



module.exports = Game