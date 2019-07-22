import React from 'react'

const Score = props => {
  const { score, turn, onClick } = props
  const inheritance = !turn && score ? 'inheritance' : ''
  return (
    <div className={`turn-score ${inheritance}`} onClick={onClick}>
      <span className='turn-score'>{score}</span>
    </div>
  )
}

export default Score
