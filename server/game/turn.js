const calcStatus = (turn, dice) => {
    if (!dice) return
    if (dice.every(die => die.pointer)) turn.fill = true
    if (!turn.fill && !dice.some(die => !die.held && die.pointer)) turn.bust = true
}

const calcScore = (turn, dice) => {
    if (!dice) return
    if (turn.bust) {
        turn.score = 0
        return
    }
    const pointers = Array(6).fill(0)
    dice.forEach(die => { if (die.held && !die.scored) pointers[die.value - 1]++ })
    pointers.forEach((pointer, idx) => {
        if (idx === 0) {
            pointer > 2 ? turn.score += 1000 * (pointer - 2) : turn.score += 100 * pointer
        } else if (idx === 4) {
            pointer > 2 ? turn.score += 500 * (pointer - 2) : turn.score += 50 * pointer
        } else {
            pointer > 2 && (turn.score += (idx + 1) * 100 * (pointer - 2))
        }
    })
    pointers.every(pointer => pointer === 1) && (this.score = 1500)
}

class Turn {

    constructor(gameId, inheritance, dice) {
        this.score = inheritance || 0
        this.fill = false
        this.bust = false
        this.gameId = gameId
        this.turnId = gameId

        calcStatus(this, dice)
        calcScore(this, dice)
    }

}

module.exports = Turn