'use strict'

import reqwest from 'reqwest'

 /**
 *  home actions
 */
const ITUNES_API_PATH = 'https://itunes.apple.com/search?'

export const FETCH_ALBUMS = 'FETCH_ALBUMS'
export const ARTISTS_LIST = 'ARTISTS_LIST'
export const CHOSEN_ARTIST = 'CHOSEN_ARTIST'
export const NEXT_ARTIST = 'NEXT_ARTIST'
export const ROUNDS_ARTISTS = 'ROUNDS_ARTISTS'
export const ROUND_NUMBER = 'ROUND_NUMBER'
export const ROUND_STATE = 'ROUND_STATE'
export const USER_SCORE = 'USER_SCORE'

export const homeActionCreators = {
  fetchItunsAlbums: (qParams) => (dispatch) => {
    reqwest({
      url: `${ITUNES_API_PATH}term=${qParams}&media=music&entity=album&limit=3`,
      type: 'jsonp'
    })
    .then((res) => {
      dispatch({
        type: FETCH_ALBUMS,
        payload: res.results
      })
    })
    .fail((err) => {
      console.log(err)
    })
  },
  createArtistsList: (value) => ({type: ARTISTS_LIST, payload: value}),
  chooseCurrentArtist: (value) => ({type: CHOSEN_ARTIST, payload: value}),
  getNextArtist: (value) => ({type: NEXT_ARTIST, payload: value}),
  usedArtistsList: (value) => ({type: ROUNDS_ARTISTS, payload: value}),
  updateRoundNumber: (value) => ({type: ROUND_NUMBER, payload: value}),
  updateRoundState: (value) => ({type: ROUND_STATE, payload: value}),
  updateUserScore: (value) => ({type: USER_SCORE, payload: value})
}
