import { combineReducers } from 'redux'
import dayPortions from './dayPortions'
import allPortions from './allPortions'

export default combineReducers({
  all: allPortions,
  day: dayPortions
})
