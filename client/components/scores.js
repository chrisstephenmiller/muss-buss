import React from 'react'
const Scores = props => {
  return (
    <div>
      <ol>{props.players.map(player => {
        const color = props.currentPlayer === player.id ? {color: 'green', 'textShadow': '2px 2px 2px black'} : {color: 'black'}
        return <h1 style={color} key={player.id}>{`${player.name}: ${player.score}`}</h1>
      })}</ol>
    </div>
  )
}

export default Scores
