import React from 'react'

import bonus400 from '../../assets/Bonus400.png'
import bonus300 from '../../assets/Bonus300.png'
import bonus500 from '../../assets/Bonus500.png'
import fill1000 from '../../assets/Fill1000.png'
import mussBuss from '../../assets/MussBuss.png'
import noDice from '../../assets/NoDice.png'
import vengeance from '../../assets/Vengeance.png'
import doubleTrouble from '../../assets/DoubleTrouble.png'
import bust from '../../assets/Bust.png'
import blank from '../../assets/Blank.png'

const cardImages = { bonus300, bonus400, bonus500, fill1000, mussBuss, noDice, vengeance, doubleTrouble, 'doubleTrouble!': doubleTrouble }

const Card = props => {
  const { card, turn, boxShadow } = props
  const bustOpacity = card.bust && card.type !== 'noDice' ? '' : 'no-bust'
  const cardOpacity = !turn ? 'no-card' : ''
  return (
    <div id='card' style={{ boxShadow }} className={`card card-container`}>
      <img src={cardImages[card.type] || blank} className={`card ${cardOpacity}`} alt={`card-${card.type}`}/>
      <img src={bust} className={`card ${bustOpacity}`} alt={`card-bust-overlay`}/>
    </div>
  )
}

export default Card
