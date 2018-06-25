const random = () => Math.floor(Math.random() * 6) + 1

class Die {

    constructor() {
        this.value = random()
        this.status = `live`
    }

    roll() { 
        this.status === `live` ? this.value = random() : this.status = `banked`
    }

    toggle() { this.status = this.status === `live` ? `held` : `live` }
}

module.exports = Die