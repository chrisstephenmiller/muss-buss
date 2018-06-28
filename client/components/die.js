import React from 'react'

import d1 from '../../assets/d1.png'
import d2 from '../../assets/d2.png'
import d3 from '../../assets/d3.png'
import d4 from '../../assets/d4.png'
import d5 from '../../assets/d5.png'
import d6 from '../../assets/d6.png'

const Die = props => {

  const dieImages = [d1, d2, d3, d4, d5, d6]
  const { die, onClick } = props
  return (
    <div key={die.id}
      style={{ display: `flex`, flexDirection: `column`, textAlign: `center` }}>
      <img src={dieImages[die.value - 1]}
        alt={`die-${die.value}`}
        style={{ height: 125, width: 125 }}
        onClick={onClick} />
      <span style={{ fontSize: 24 }}>
        {die.status}
      </span>
    </div>
  )
}

export default Die