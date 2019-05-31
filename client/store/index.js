import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import users from './users'
import game from './game'

const reducer = combineReducers({ user, users, game})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './game'