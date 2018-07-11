import React from 'react'
import { connect } from 'react-redux'

const Score = (props) => {
  const { score } = props.turn
  return (
    <div>
      <span style={{ fontSize: 24 }}>
        Score: {score}
      </span>
    </div>
  )
}

const mapState = state => {
  const { turn } = state
  return { turn }
}

export default connect(mapState)(Score)