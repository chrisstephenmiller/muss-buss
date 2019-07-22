import React, { Component } from 'react'

import bonus400 from '../../assets/Bonus400.png'
import bonus300 from '../../assets/Bonus300.png'
import bonus500 from '../../assets/Bonus500.png'
import fill1000 from '../../assets/Fill1000.png'
import mussBuss from '../../assets/MussBuss.png'
import noDice from '../../assets/NoDice.png'
import vengeance from '../../assets/Vengeance.png'
import doubleTrouble from '../../assets/DoubleTrouble.png'
import bust from '../../assets/Bust.png'

class Card extends Component {

  render() {
    const cardImages = { bonus300, bonus400, bonus500, fill1000, mussBuss, noDice, vengeance, doubleTrouble, 'doubleTrouble!': doubleTrouble }
    const { card, turn, drawCard, invalidDraw } = this.props
    const bustOpacity = card.bust && card.type !== 'noDice' ? '' : 'no-bust'
    const cardOpacity = !turn ? 'no-card' : ''
    const drawBorder = !invalidDraw ? 'draw' : ''
    return (
      <div className={`card card-container ${drawBorder}`} onClick={drawCard}>
        <img src={cardImages[card.type]} className={`card ${cardOpacity}`} alt={`card-${card.type}`}/>
        <img src={bust} className={`card ${bustOpacity}`} alt={`card-bust-overlay`}/>
      </div>
    )
  }
}

export default Card
