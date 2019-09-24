import React from 'react'

import draw from '../../assets/Draw.png'
import drawHover from '../../assets/DrawHover.png'

const Draw = props => {
  const { drawCard, invalidDraw, deckSize, boxShadow, gameId } = props
  const goodDraw = !invalidDraw ? 'draw' : ''
  const shuffle = deckSize === 0 ? 'shuffle' : ''
  return (
    <div id='deck' className={`card card-container ${goodDraw} draw-border`} style={{ boxShadow }} onClick={() => drawCard(gameId)}>
      <img src={draw} alt={`card-back`} className={`card ${shuffle}`} />
      <img src={drawHover} alt={`card-words`} className={`card ${goodDraw} draw-hover ${shuffle}`} />
    </div>
  )
}

export default Draw
