import React from 'react'
import { connect } from 'react-redux'

const sortById = (dieA, dieB) => dieA.id - dieB.id

const Scores = props => {
  const { players, game } = props
  return (
    <div style={{display: `flex`, flexDirection: `column`}}>
      {players.sort(sortById).map(player => {
        const bold = player.id === game.currentPlayer ? `underline` : `none`
        return (
          <span key={player.id} style={{ fontSize: 24, textDecoration: `${bold}` }}>
            {`${player.name} - ${player.score}`}
          </span>
           
        )
      })}
    </div>
  )
}

const mapState = state => {
  const { players, game } = state
  return { players, game }
}

export default connect(mapState)(Scores)