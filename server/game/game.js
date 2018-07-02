const Player = require('./player')

class Game {

    constructor(players) {
        this.players = players.map(player => new Player(player))
        this.currentPlayer = 0
    }

    nextTurn() {
        this.currentPlayer++
        this.currentPlayer %= this.players.length
    }

}



module.exports = Game