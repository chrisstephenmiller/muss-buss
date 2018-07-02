const DieModel = require(`../db/models/die`)

const random = () => Math.floor(Math.random() * 6) + 1

class Die {

    constructor() {

        this.value = random()
        this.held = false
        this.scored = false
        this.pointer = false
    }



}

module.exports = Die