import React from 'react'

import d0 from '../../assets/d0.png'
import d1 from '../../assets/d1.png'
import d2 from '../../assets/d2.png'
import d3 from '../../assets/d3.png'
import d4 from '../../assets/d4.png'
import d5 from '../../assets/d5.png'
import d6 from '../../assets/d6.png'

const Die = props => {
  const dieImages = [d0, d1, d2, d3, d4, d5, d6]
  const { die, holdDie, gameId, isCurrentPlayer} = props
  const held = die.held ? 'held' : ''
  const pointer = die.pointer ? 'pointer' : ''
  const live = die.live ? 'live' : ''
  const currentPlayer = isCurrentPlayer ? 'roller' : ''
  const dieStates = `${held} ${pointer} ${live} ${currentPlayer}`
  return (
    <div className='die-container'>
      <img src={dieImages[die.value]} className={`die ${dieStates}`} alt={`die-${die.value}`} onClick={() => holdDie(gameId, die.id)}/>
    </div>
  )
}

export default Die
