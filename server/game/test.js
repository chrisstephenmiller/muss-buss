const Turn = require('./turn')

console.log(`start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
const turn = new Turn()
console.log(turn)
turn.dice.forEach(die => { if (die.pointer) die.toggle() })
turn.roll()
turn.dice.forEach(die => { if (die.pointer) die.toggle() })
console.log(turn)
turn.dice.forEach(die => { if (die.pointer) die.toggle() })
turn.stop()
console.log(turn)