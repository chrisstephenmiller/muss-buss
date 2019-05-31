class Die {
    constructor(id) {
        this.value = Math.ceil(Math.random() * 6)
        this.live = true
        this.held = false
        this.pointer = false
        this.id = id
    }
}

module.exports = Die