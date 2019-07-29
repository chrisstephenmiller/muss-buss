import React from 'react'

import draw from '../../assets/Draw.png'

const Draw = props => {
  const { drawCard, invalidDraw, deckSize, gameId } = props
  const drawBorder = !invalidDraw ? 'draw' : ''
  const drawShadow = `${deckSize / 3}px ${deckSize / 3}px 10px black`
  const drawOpacity = deckSize === 0 ? 'no-draw' : ''
  return (
    <div style={{ boxShadow: drawShadow }} className={`card card-container ${drawBorder}`} onClick={() => drawCard(gameId)}>
      <img src={draw} alt={`card-back`} className={`card ${drawOpacity}`} />
    </div>
  )
}

export default Draw
