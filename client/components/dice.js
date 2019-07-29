import React from 'react'
import { Die } from '../components'

const die = i => { return { "id": i, "held": false, "live": true, "value": 0, "pointer": false } }
const emptyDice = Array(6).fill(null).map((_, i) => die(i))

const Dice = props => {
  const { dice, card, turn, holdDie, gameId } = props
  const allDice = dice.length ? dice : emptyDice
  return (
    <div className='dice-container'>
      {allDice.map((die => {
        return (
          <Die key={die.id}
            card={card}
            turn={turn}
            die={die}
            holdDie={holdDie}
            gameId={gameId} />
        )
      }))}
    </div>
  )
}

export default Dice
