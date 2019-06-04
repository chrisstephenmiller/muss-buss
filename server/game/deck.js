class Deck {
    constructor() {
        // this.bonus300 = Array(12).fill('bonus300')
        // this.bonus400 = Array(10).fill('bonus400')
        this.bonus500 = Array(8).fill('bonus500')
        // this.noDice = Array(8).fill('noDice')
        // this.fill1000 = Array(6).fill('fill1000')
        // this.mussBuss = Array(4).fill('mussBuss')
        this.vengeance = Array(4).fill('vengeance')
        // this.doubleTrouble = Array(2).fill('doubleTrouble')
    }

    draw() {
        const deck = []
        Object.values(this).forEach(cards => deck.push(...cards))
        const choice = Math.floor(Math.random() * deck.length)
        const card = deck[choice]
        this[card] && this[card]--
        console.log(card)
        return card ? card : null
    }
}

module.exports = Deck

