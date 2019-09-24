import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, Scores, Card, Button, Draw } from '../components'
import { getGameThunk, rollDiceThunk, drawCardThunk, stopTurnThunk, passTurnThunk, holdDiceThunk, rollingAnimation } from '../store'
import socket from '../socket'

const deckShadow = deckSize => `${deckSize / 5}px ${deckSize / 3.5}px ${deckSize / 8}px ${deckSize / 12}px black`

class Game extends Component {

  constructor(props) {
    super(props)
    const { rollDice, holdDie, drawCard, stopTurn, passTurn, match } = this.props
    const gameId = match.params.id
    this.keyListeners = () => {
      switch (event.key) {
        case 'r': return rollDice(gameId)
        case 'h': return holdDie(gameId, 6)
        case 'd': return drawCard(gameId)
        case 's': return stopTurn(gameId)
        case 'p': return passTurn(gameId)
      }
    }
  }

  componentDidMount() {
    const { getGame, match, animateRoll } = this.props
    const gameId = match.params.id
    getGame(gameId)
    socket.on('updateIn', async (game, roll) => { if (game === gameId) roll ? animateRoll() : getGame(gameId) })
    document.addEventListener('keydown', this.keyListeners)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyListeners)
  }

  render() {
    const { game, drawCard, rollDice, holdDie, stopTurn, passTurn, user, match } = this.props
    const { currentPlayer, invalidActions, players, dice, prevDice, card, prevCard, score, turn, deckSize, winner } = game
    const gameId = match.params.id
    const isCurrentPlayer = user.id === currentPlayer.id
    const holdAll = gameId => { holdDie(gameId, 6) }
    for (const a in invalidActions) invalidActions[a] = invalidActions[a] || !isCurrentPlayer
    const { invalidDraw, invalidRoll, invalidHolds, invalidStop, invalidPass } = invalidActions
    const scoreProps = { score, passTurn, invalidPass, gameId }
    if (winner) setTimeout(() => alert(game.winner + ' won!'), 100)
    return (
      <div id='game-container'>
        <div className='section'>
          <div className='button-container'>
            <Button text={`ROLL`} onClickFunc={rollDice} invalidAction={invalidRoll} gameId={gameId} />
            <Button text={`HOLD`} onClickFunc={holdAll} invalidAction={invalidHolds} gameId={gameId} />
            <Button text={`STOP`} onClickFunc={stopTurn} invalidAction={invalidStop} gameId={gameId} />
          </div>
          <Dice dice={dice || prevDice || []} holdDie={holdDie} gameId={gameId} isCurrentPlayer={isCurrentPlayer} />
          <div className='cards-container'>
            <Draw boxShadow={deckShadow(deckSize)} deckSize={deckSize} drawCard={drawCard} invalidDraw={invalidDraw} gameId={gameId} />
            <Card turn={turn} boxShadow={deckShadow(54 - deckSize)} card={card || prevCard || {}} gameId={gameId} />
          </div>
        </div>
        <div className='section'>
          <Scores scoreProps={scoreProps} players={players} currentPlayerId={currentPlayer.id || 0} />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  const { game, user } = state
  return { game, user }
}

const mapDispatch = dispatch => {
  return {
    getGame: gameId => dispatch(getGameThunk(gameId)),
    drawCard: gameId => dispatch(drawCardThunk(gameId)),
    rollDice: gameId => dispatch(rollDiceThunk(gameId)),
    holdDie: (gameId, dieId) => dispatch(holdDiceThunk(gameId, dieId)),
    stopTurn: gameId => dispatch(stopTurnThunk(gameId)),
    passTurn: gameId => dispatch(passTurnThunk(gameId)),
    animateRoll: () => dispatch(rollingAnimation())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))
