import React from 'react'

const PlayerScores = props => {
  const { player, currentPlayerId } = props
  const showImpunity = player.turns[0] && player.turns[0].impunity
  const scoringTurns = player.turns.slice(showImpunity ? 0 : 1).filter(turn => turn.score).reverse()
  const numVisible = 15
  let tempScore = 0
  const scoringTurnTotals = scoringTurns.map((turn, index) => {
    tempScore += turn.score
    return { score: tempScore, turn: index }
  }).splice(-numVisible)
  const currentPlayer = currentPlayerId === player.id ? 'current-player' : ''
  return (
    <div className='player-score-list'>
      <span className={`player-name ${currentPlayer}`}>{player.name}</span>
      {scoringTurnTotals.map((total, index) => { if (total.score) return <span className={index === scoringTurnTotals.length - 1 ? 'player-score' : 'past-player-score'} key={player.name + '-' + total.turn}>{total.score}</span>})}
    </div>
  )
}

export default PlayerScores
