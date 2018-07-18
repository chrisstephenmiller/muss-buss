import React from 'react'
import { connect } from 'react-redux'

const Score = (props) => {
  const { score } = props.turn
  return (
    <div style={{ display: `flex` }}>
      <span style={{ fontSize: 32, margin: `10px` }}>
        {`${score}`}
      </span>
    </div>
  )
}

const mapState = state => {
  const { turn } = state
  return { turn }
}

export default connect(mapState)(Score)
