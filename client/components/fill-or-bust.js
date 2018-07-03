import React from 'react'

const FillOrBust = props => {

  const { fillOrBust } = props
  console.log(fillOrBust)
  return (
    <div>
      <span style={{ fontSize: 24 }}>
        {fillOrBust[0] ? `fill` : (fillOrBust[1] ? `bust` : `live`)}
      </span>
    </div>
  )
}

export default FillOrBust