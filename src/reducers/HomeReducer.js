'use strict'
/**
 *  Home Reducer
 */
import { createReducer } from 'utils'
import { artists, maxRounds, maxRoundState } from '../utils/constants'
import {
  FETCH_ALBUMS,
  ARTISTS_LIST,
  CHOSEN_ARTIST,
  NEXT_ARTIST,
  ROUNDS_ARTISTS,
  ROUND_NUMBER,
  ROUND_STATE,
  USER_SCORE
} from 'actions/home_action'

const InitialState = {
  artistAlbumList: [],
  artistList: artists,
  chosenArtist: '',
  nextArtist: '',
  roundUsedArtists: [],
  roundNumber: 0,
  roundState: 0,
  userScore: 0
}

export const artistAlbumList = createReducer(InitialState.artistAlbumList, {
  [FETCH_ALBUMS]: (state, payload) => payload
})

export const artistList = createReducer(InitialState.artistList, {
  [ARTISTS_LIST]: (state, payload) => payload
})

export const chosenArtist = createReducer(InitialState.chosenArtist, {
  [CHOSEN_ARTIST]: (state, payload) => payload
})

export const nextArtist = createReducer(InitialState.nextArtist, {
  [NEXT_ARTIST]: (state, payload) => payload
})

export const roundUsedArtists = createReducer(InitialState.roundUsedArtists, {
  [ROUNDS_ARTISTS]: (state, payload) => payload.length ? state.concat(payload) : []
})

export const roundNumber = createReducer(InitialState.roundNumber, {
  [ROUND_NUMBER]: (state, payload) => state === maxRounds ? 0 : state + 1
})

export const roundState = createReducer(InitialState.roundState, {
  [ROUND_STATE]: (state, payload) => payload === 'start' ? 0 : state === maxRoundState || payload === 'success' ? 1 : state + 1
})

export const userScore = createReducer(InitialState.userScore, {
  [USER_SCORE]: (state, payload) => !payload ? 0 : state + payload
})
