import React, { Component } from 'react'

import d0 from '../../assets/d0.png'
import d1 from '../../assets/d1.png'
import d2 from '../../assets/d2.png'
import d3 from '../../assets/d3.png'
import d4 from '../../assets/d4.png'
import d5 from '../../assets/d5.png'
import d6 from '../../assets/d6.png'

class Die extends Component {

  render() {
    const dieImages = [d0, d1, d2, d3, d4, d5, d6]
    const { die, card, turn, holdDice } = this.props
    const held = die.held ? 'held' : ''
    const pointer = die.pointer ? 'pointer' : ''
    console.log(die)
    const isOrtoBeLive = die.live || (!card.rolls.length && !die.held)
    const inheritableNonPointers = !die.live && !die.pointer & !card.bust
    const live = (turn ? isOrtoBeLive : inheritableNonPointers) ? 'live' : ''
    return (
      <div className='die-container'>
        <img src={dieImages[die.value]}
          className={`die ${held} ${pointer} ${live}`}
          alt={`die-${die.value}`}
          onClick={holdDice}
        />
      </div>
    )
  }
}

export default Die
