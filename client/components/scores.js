import React from 'react'
const Scores = props => {
  return (
    <div>
      <ol>{props.players.map(player => {
        const currentPlayer = props.currentPlayer === player.id
        const color = currentPlayer ? {color: 'green', 'textShadow': '2px 2px 2px black'} : {color: 'black'}
        return <h1 style={color} key={player.id}>{`${player.name}: ${player.score} ${currentPlayer && !player.turns[0] ? '- DRAW' : ''}`}</h1>
      })}</ol>
    </div>
  )
}

export default Scores
