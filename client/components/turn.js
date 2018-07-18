import React from 'react'
import { connect } from 'react-redux'

const Turn = props => {
  const { fill, bust } = props.turn
  const status = !fill && !bust ? `Live` : (fill ? `Fill` : `Bust`)
  return (
    <div style={{ display: `flex`, alignItems: `center`, height: 48, width: 98, margin: 10, border: `1px solid black`, borderRadius: 5 }}>
      <span style={{ fontSize: 20, width: 98, textAlign: `center` }}>
        {status}
      </span>
    </div>
  )
}

const mapState = state => {
  const { turn } = state
  return { turn }
}

export default connect(mapState)(Turn)
