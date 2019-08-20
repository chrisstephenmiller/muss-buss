import React from 'react'
import { Die } from '../components'

const die = i => { return { "id": i, "held": false, "live": true, "value": 0, "pointer": false } }
const emptyDice = Array(6).fill(null).map((_, i) => die(i))

const Dice = props => {
  const { dice, holdDie, gameId, isCurrentPlayer } = props
  const allDice = dice.length ? dice : emptyDice
  return (
    <div className='dice-container'>
      {allDice.map((die => {
        return (
          <Die isCurrentPlayer={isCurrentPlayer} key={die.id}
            die={die}
            holdDie={holdDie}
            gameId={gameId} />
        )
      }))}
    </div>
  )
}

export default Dice
