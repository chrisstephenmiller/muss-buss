import React from 'react'
import { connect } from 'react-redux'

const Score = (props) => {
  const { score } = props.turn
  return (
    <div style={{ display: `flex`, alignItems: `center`, height: 48, width: 98, margin: 10, border: `1px solid black`, borderRadius: 5 }}>
      <span style={{ fontSize: 20, width: 98, textAlign: `center` }}>
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
