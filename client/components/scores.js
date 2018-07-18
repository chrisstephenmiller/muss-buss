import React from 'react'
import { connect } from 'react-redux'

const sortById = (dieA, dieB) => dieA.id - dieB.id

const Scores = props => {
  const { players, game } = props
  return (
    <div style={{ display: `flex`}}>
      {players.sort(sortById).map(player => {
        const border = player.id === game.currentPlayer ? `black` : `white`
        return (
          <div key={player.id} style={{ display: `flex`, flexDirection: `column`, width: 88, margin: 10, padding: 5, border: `1px solid ${border}` }}>
            <span style={{ fontSize: 20, textDecoration: `underline` }}>
              {`${player.name}`}
            </span>
            <span style={{ fontSize: 20}}>
              {`${player.score}`}
            </span>
          </div>
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
