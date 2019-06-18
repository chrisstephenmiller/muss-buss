import React from 'react'
const PlayerScores = props => {
  const { player, currentPlayerId } = props
  const scoringTurns = player.turns.slice(player.turns[0] && player.turns[0].impunity ? 0 : 1).filter(turn => turn.score).reverse()
  let tempScore = 0
  const scoringTurnTotals = scoringTurns.map((turn, index) => {
    tempScore += turn.impunity || turn.score
    return { score: tempScore, turn: index }
  })
  const currentPlayer = currentPlayerId === player.id ? 'current-player' : ''
  return (
    <div className='player-score-list'>
      <h1 className={`player-name ${currentPlayer}`}>{player.name}</h1>
      {scoringTurnTotals.map((total, index) => { if (total.score) return <h1 className={index === scoringTurnTotals.length - 1 ? 'player-score' : 'past-player-score'} key={player.name + '-' + total.turn}>{total.score}</h1>})}
    </div>
  )
}

export default PlayerScores
