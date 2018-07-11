import React from 'react'
import { connect } from 'react-redux'

const sortById = (dieA, dieB) => dieA.id - dieB.id

const Scores = props => {
  const { players, game } = props
  return (
    <div>
      {players.sort(sortById).map(player => {
        // if player.id=
        return (
          <span key={player.id} style={{ fontSize: 24 }}>
            {`${player.name} - ${player.score} `}
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