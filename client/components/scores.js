import React from 'react'

const Scores = props => {
  const { players } = props
  return (
    <div>
      {players && players.map(player => {
        return (
          <span key={player.id} style={{ fontSize: 24 }}>
            {`${player.name} - ${player.score} `}
          </span>
        )
      }
      )}
    </div>
  )
}

const mapState = state => {
  const { players } = state
  return { players }
}

export default Scores