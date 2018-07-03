const Die = require('./die')

class Turn {
    
    constructor(inheritance = 0) {
        this.dice = Array(6).fill({})
        this.score = inheritance
        this.fill = false
        this.bust = false
        
        this.roll()
    }
    
    roll() {
        if (this.bust) return
        this.dice = this.dice.map(die => {
            if (die && die.held) die.scored = true
            return die.held ? die : new Die(die.id)
        })
        this.calcPointers()
        this.calcStatus()
        this.calcScore()
    }
    
    calcStatus() {
        if (!this.dice.find(die => !die.pointer)) this.fill = true
        if (!this.fill && !this.dice.find(die => !die.held && die.pointer)) this.bust = true
    }
    
    calcPointers() {
        const totals = Array(6).fill(0)
        this.dice.forEach(die => { if (!die.held) totals[die.value - 1]++ })
        this.dice.forEach(die => { if (die.value === 1 || die.value === 5 || totals[die.value - 1] > 2) die.pointer = true })
        totals.filter(total => total === 1).length === 6 && this.dice.forEach(die => { die.pointer = true })
    }
    
    calcScore() {
        if (this.bust) this.score = 0
        const pointers = Array(6).fill(0)
        this.dice.forEach(die => { if (!die.scored) pointers[die.value - 1]++ })
        pointers.forEach((pointer, idx) => {
            if (idx === 0) {
                pointer > 2 ? this.score += 1000 * (pointer - 2) : this.score += 100 * pointer
            } else if (idx === 4) {
                pointer > 2 ? this.score += 500 * (pointer - 2) : this.score += 50 * pointer
            } else {
                pointer > 2 && (this.score += (idx + 1) * 100 * (pointer - 2))
            }
        })
        pointers.filter(pointer => pointer === 1).length === 6 && (this.score = 1500)
    }

}

module.exports = Turn