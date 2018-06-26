const Turn = require('./turn')

console.log(`start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
const turn = new Turn()
console.log(turn)
while (turn.status === `live`) {
    turn.roll()
    console.log(turn)
}