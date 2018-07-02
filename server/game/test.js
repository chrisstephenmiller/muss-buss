const Turn = require('./turn')
const Game = require('./game')

const game = new Game([`chris`, `john`, `peter`])

while (!game.players.find(player => player.score > 10000)) {
    game.nextTurn()
    const turn = new Turn
    while (!turn.fill && !turn.bust && turn.score < 400) {
        turn.dice.forEach(die => { if (die.pointer) die.held = true })
        turn.roll()
    }
    game.players[game.currentPlayer].score += turn.score
}