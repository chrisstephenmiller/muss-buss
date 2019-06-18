class Deck {
    constructor(deck) {
        // this.bonus300 = deck ? deck.bonus300 : Array(12).fill('bonus300')
        // this.bonus400 = deck ? deck.bonus400 : Array(10).fill('bonus400')
        // this.bonus500 = deck ? deck.bonus500 : Array(8).fill('bonus500')
        // this.noDice = deck ? deck.noDice : Array(8).fill('noDice')
        // this.fill1000 = deck ? deck.fill1000 : Array(6).fill('fill1000')
        this.mussBuss = deck ? deck.mussBuss : Array(4).fill('mussBuss')
        this.vengeance = deck ? deck.vengeance : Array(4).fill('vengeance')
        // this.doubleTrouble = deck ? deck.doubleTrouble : Array(2).fill('doubleTrouble')
    }

    draw() {
        const deck = []
        Object.values(this).forEach(cards => deck.push(...cards))
        const choice = Math.floor(Math.random() * deck.length)
        const card = deck[choice]
        this[card] && this[card].pop()
        return card ? card : null
    }

    deck(card) {
        switch (card) {
            case 'bonus300': return Array(12).fill('bonus300')
            case 'bonus400': return Array(10).fill('bonus400')
            case 'bonus500': return Array(8).fill('bonus500')
            case 'noDice': return Array(8).fill('noDice')
            case 'fill1000': return Array(6).fill('fill1000')
            case 'mussBuss': return Array(4).fill('mussBuss')
            case 'vengeance': return Array(4).fill('vengeance')
            case 'doubleTrouble': return Array(2).fill('doubleTrouble')
        }
    }

    shuffle() {
        for (const card of Object.keys(this)) this[card] = this.deck(card)
        return this.draw()
    }
}

module.exports = Deck

