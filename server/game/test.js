const Turn = require('./turn')
const turn = new Turn()

console.log(turn)
turn.roll()
turn.dice[1].toggle()
turn.dice[3].toggle()
turn.dice[5].toggle()
console.log(turn)
turn.roll()
console.log(turn)
