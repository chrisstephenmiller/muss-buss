class Die {

    constructor(gameId, id, value = Math.floor(Math.random() * 6) + 1) {

        this.id = id || null
        this.value = value
        this.held = false
        this.scored = false
        this.pointer = false
        this.gameId = gameId
    }
}

module.exports = Die
