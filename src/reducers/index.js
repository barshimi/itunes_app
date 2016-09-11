import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import * as HomeReducer from './HomeReducer'

const {
  artistAlbumList,
  artistList,
  chosenArtist,
  nextArtist,
  roundUsedArtists,
  roundNumber,
  roundState,
  userScore
} = HomeReducer

let asyncReducers = {}

export function registerNewReducers (newReducerObj) {
  asyncReducers = Object.assign(asyncReducers, newReducerObj)
}

export default function rootReducer () {
  const initialReducers = {
    artistAlbumList: artistAlbumList,
    artistList: artistList,
    chosenArtist: chosenArtist,
    nextArtist: nextArtist,
    roundUsedArtists: roundUsedArtists,
    roundNumber: roundNumber,
    roundState: roundState,
    userScore: userScore,
    routing: router
  }
  var reducersObj = Object.assign(initialReducers, asyncReducers)
  return combineReducers(reducersObj)
}
