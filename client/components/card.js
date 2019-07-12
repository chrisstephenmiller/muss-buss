import React, { Component } from 'react'

import bonus400 from '../../assets/Bonus400.png'
import bonus300 from '../../assets/Bonus300.png'
import bonus500 from '../../assets/Bonus500.png'
import fill1000 from '../../assets/Fill1000.png'
import mussBuss from '../../assets/MussBuss.png'
import noDice from '../../assets/NoDice.png'
import vengeance from '../../assets/Vengeance.png'
import doubleTrouble from '../../assets/DoubleTrouble.png'

class Card extends Component {

  render() {
    const cardImages = { bonus300, bonus400, bonus500, fill1000, mussBuss, noDice, vengeance, doubleTrouble }
    const { card } = this.props
    return (
      <div key={card.type}
        style={{ display: `flex`, flexDirection: `column`, textAlign: `center`, height: 350, width: 250, marginTop: 5 }}>
        <img src={cardImages[card.type]}
          alt={`card-${card.type}`}
          style={{
            height: 350,
            width: 250,
            margin: `0px 5px 0px`,
            border: `2px solid black`,
            borderRadius: 10,
          }}
        />
      </div>
    )
  }
}

export default Card
