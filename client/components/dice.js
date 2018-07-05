import React from 'react'
import { connect } from 'react-redux'
import { Die, Roll, Score, FillOrBust, Scores, Stop, NewGame } from '../components'
import { getDice } from '../store'

const sortById = (dieA, dieB) => dieA.id - dieB.id

const Dice = props => {

  const { dice, toggleDie, turn, players } = props
  return (
    <div style={{ display: `flex`, flexDirection: `column` }} >
      <div style={{ display: `flex` }}>
        {dice.sort(sortById).map((die => {
          return <Die key={die.id}
            die={die}
            onClick={() => toggleDie(dice, die)} />
        }))}
      </div>
      <Roll />
      <Stop />
      <Score score={turn.score} />
      <FillOrBust fillOrBust={[turn.fill, turn.bust]} />
      <Scores players={players}/>
    </div>
  )
}

const mapState = state => {
  const { dice, game, turn, players } = state
  return { dice, game, turn, players }
}

const mapDispatch = dispatch => {
  return {
    toggleDie: (dice, die) => {
      if (die.pointer && !die.scored) {
        die.held = !die.held
        dispatch(getDice([...dice]))
      }
    },
  }
}

export default connect(mapState, mapDispatch)(Dice)