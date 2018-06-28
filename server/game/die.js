const shortid = require('shortid')

class Die {

    constructor() {
        this.value = null
        this.status = `live`
        this.pointer = false
        this.id = shortid.generate()
    }

    roll() {
        this.status === `live` ? this.value = Math.floor(Math.random() * 6) + 1 : this.status = `banked`
    }
}

module.exports = Die