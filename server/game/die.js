class Die {

    constructor() {
        this.value = null
        this.status = `live`
        this.pointer = false
    }

    roll() {
        this.status === `live` ? this.value = Math.floor(Math.random() * 6) + 1 : this.status = `banked`
    }

    toggle() {
        if (this.pointer && this.status !== `banked`) this.status = this.status === `live` ? `held` : `live`
    }
}

module.exports = Die