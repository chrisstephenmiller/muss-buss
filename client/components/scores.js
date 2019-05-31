import React from 'react'

const Scores = players => {
  return (
    <div style={{ display: `flex` }}>
      <ol>
        {players.players.map(((player, i) => <h1 key={player.id}>{`${player.id}: ${player.score}`}</h1>))}
      </ol>
    </div>
  )
}

export default Scores
