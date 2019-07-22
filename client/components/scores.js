import React from 'react'
import { PlayerScores } from '../components'

const Scores = props => {
  const { players, currentPlayerId, turn } = props
  return (
    <div className='scores'>
      {players.map((player, i) => <PlayerScores
        key={player.id}
        player={player}
        currentPlayerId={currentPlayerId}
      />)}
    </div>
  )
}

export default Scores
