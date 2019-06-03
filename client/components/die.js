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
  const { die, holdDice } = props
  const heldOffset = die.held ? 0 : 25
  const pointerColor = (die.pointer) ? `green` : `red`
  const lpShadow = die.live && die.pointer ? 3 : 0
  return (
    <div key={die.id}
      onClick={holdDice}
      style={{ display: `flex`, flexDirection: `column`, textAlign: `center`, height: 160, marginTop: 5 }}>
      <img src={dieImages[die.value]}
        alt={`die-${die.value}`}
        style={{
          height: 125,
          width: 125,
          margin: `${heldOffset}px 5px 0px`,
          border: `2px solid ${pointerColor}`,
          borderRadius: 22,
          boxShadow: `${lpShadow}px ${lpShadow}px ${lpShadow}px black`
        }}
      />
    </div>
  )
}

export default Die
