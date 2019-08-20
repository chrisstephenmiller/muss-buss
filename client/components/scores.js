import React from 'react'
import { PlayerScores, Score } from '../components'

const Scores = props => {
  const { players, currentPlayerId, scoreProps } = props
  return (
    <div className='all-scores'>
      <Score score={scoreProps.score} passTurn={scoreProps.passTurn} invalidPass={scoreProps.invalidPass} gameId={scoreProps.gameId} />
      <div className='past-scores'>
        {players.map((player, i) => <PlayerScores
          key={player.id}
          player={player}
          currentPlayerId={currentPlayerId}
        />)}
      </div>
    </div>
  )
}

export default Scores
