import React from 'react'
import { connect } from 'react-redux'

const Turn = props => {
  const { fill, bust } = props.turn
  const status = !fill && !bust ? `Live` : (fill ? `Fill` : `Bust`)
  return (
    <div>
      <span style={{ fontSize: 24 }}>
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