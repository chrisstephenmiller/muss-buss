const random = () => Math.floor(Math.random() * 6) + 1

class Die {

    constructor(id = null, value = random()) {

        this.id = id
        this.value = value
        this.held = false
        this.scored = false
        this.pointer = false
    }
}

module.exports = Die