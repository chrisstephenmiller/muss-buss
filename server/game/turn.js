const Die = require('./die')

const calcPointers = dice => {
    const totals = Array(6).fill(0)
    dice.forEach(die => { 
        die.pointer = false
        totals[die.value - 1]++ 
    })
    dice.forEach(die => { if (die.value === 1 || die.value === 5 || totals[die.value - 1] > 2) die.pointer = true })
    totals.filter(total => total === 1).length === 6 && dice.forEach(die => { die.pointer = true })
}

const calcScore = (dice, score, status) => {
    if (status === `bust`) return 0
    const pointers = Array(6).fill(0)
    dice.forEach(die => { if (die.status === `banked`) pointers[die.value - 1]++ })
    pointers.forEach((pointer, idx) => {
        if (idx === 0) {
            pointer > 2 ? score += 1000 * (pointer - 2) : score += 100 * pointer
        } else if (idx === 4) {
            pointer > 2 ? score += 500 * (pointer - 2) : score += 50 * pointer
        } else {
            pointer > 2 && (score += (idx + 1) * 100 * (pointer - 2))
        }
    })
    pointers.filter(pointer => pointer === 1).length === 6 && (score = 1500)
    return score
}

const calcStatus = (dice, status) => {
    if (dice.filter(die => die.pointer === true).length === 6) {
        dice.forEach(die => { die.status = `banked` })
        return `fill`
    } 
    if (status === `live` && dice.filter(die => die.status === `live` && die.pointer === true).length === 0) return `bust`
    return `live`
}

class Turn {

    constructor(score = 0, card) {
        this.dice = [new Die, new Die, new Die, new Die, new Die, new Die,]
        this.status = `live`
        this.score = score
        this.card = card

        this.roll()
    }

    roll() {
        this.dice.forEach(die => die.roll())
        calcPointers(this.dice)
        this.status = calcStatus(this.dice, this.status)
        this.score = calcScore(this.dice, this.score, this.status)
    }

}

module.exports = Turn