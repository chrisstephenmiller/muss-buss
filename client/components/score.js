import React from 'react'

const Score = props => {

  const { score } = props
  return (
    <div>
      <span style={{ fontSize: 24 }}>
        {score}
      </span>
    </div>
  )
}

export default Score