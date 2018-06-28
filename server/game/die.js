class Die {

    constructor() {
        this.value = null
        this.held = false
        this.scored = false
        this.pointer = false
    }

    roll() {
        this.held ? this.scored = true : this.value = Math.floor(Math.random() * 6) + 1
    }
}

module.exports = Die