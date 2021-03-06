import React from 'react'

const Score = props => {
  const { score, passTurn, invalidPass, gameId } = props
  const inheritance = invalidPass ? '' : 'inheritance'
  return (
    <div className={`turn-score-container`} onClick={() => passTurn(gameId)}>
      <span className={`turn-score ${inheritance}`}>{score}</span>
    </div>
  )
}

export default Score
