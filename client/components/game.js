import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, PlayerScores, Card, Button } from '../components'
import { getGameThunk, rollDiceThunk, drawCardThunk, stopTurnThunk, passTurnThunk, holdDiceThunk } from '../store'
import socket from '../socket'

class Game extends Component {

  componentDidMount() {
    const { getGame, match, rollDice, holdAll, drawCard, stopTurn, passTurn } = this.props
    const gameId = match.params.id
    getGame(gameId)
    document.addEventListener('keydown', () => {
      switch (event.key) {
        case 'r': return rollDice(gameId)
        case 'h': return holdAll(gameId)
        case 'd': return drawCard(gameId)
        case 's': return stopTurn(gameId)
        case 'p': return passTurn(gameId)
      }
    })
    socket.on('updateIn', () => getGame(gameId))
  }

  render() {
    const { game, match, rollDice, drawCard, stopTurn, passTurn, holdAll, user } = this.props
    const { players, dice, card, currentPlayer, score, invalidActions, winner } = game
    const gameId = match.params.id
    const isCurrentPlayer = user.id === currentPlayer.id
    console.log(invalidActions)
    for (const a in invalidActions) invalidActions[a] = invalidActions[a] || isCurrentPlayer
    if (winner) setTimeout(() => alert(game.winner), 100)
    return (
      <div id="game">
        <Card card={card} />
        <Dice dice={dice} />
        <h1>{`${card.type ? (card.bust ? 'BUST' : score) : 'DRAW'}`} </h1>
        <div style={{ display: 'flex' }}>
          <Button text={`[D]RAW`} action={invalidActions.invalidDraw} onClick={() => drawCard(gameId)}/>
          <Button text={`[R]OLL`} action={invalidActions.invalidRoll} onClick={() => rollDice(gameId)}/>
          <Button text={`[H]OLD`} action={invalidActions.invalidHold} onClick={() => holdAll(gameId)}/>
          <Button text={`[S]TOP`} action={invalidActions.invalidStop} onClick={() => stopTurn(gameId)}/>
          <Button text={`[P]ASS`} action={invalidActions.invalidPass} onClick={() => passTurn(gameId)}/>
        </div>
        <div style={{display: 'flex'}}>
        {players.map((player, i) => <PlayerScores
          key={player.id}
          player={player}
          currentPlayerId={currentPlayer.id || 0}
        />)}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  const { game, user } = state
  return { game, user , user}
}

const mapDispatch = dispatch => {
  return {
    getGame: gameId => dispatch(getGameThunk(gameId)),
    holdAll: gameId => dispatch(holdDiceThunk(gameId, 6)),
    rollDice: gameId => dispatch(rollDiceThunk(gameId)),
    drawCard: gameId => dispatch(drawCardThunk(gameId)),
    stopTurn: gameId => dispatch(stopTurnThunk(gameId)),
    passTurn: gameId => dispatch(passTurnThunk(gameId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))
