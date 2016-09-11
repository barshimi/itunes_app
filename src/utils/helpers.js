'use strict'

import {artists as artistList} from './constants'

export function ArrangeRawList (list) {
  return list.map((album) => {
    if (!album.hasOwnProperty('collectionName') && !album.hasOwnProperty('collectionId') && !album.hasOwnProperty('artworkUrl100')) return

    return {
      name: album.collectionName,
      id: album.collectionId,
      img: album.artworkUrl100
    }
  })
}

export function ChooseNewArtist (roundUsedArtists, nextArtist) {
  let newArtist = artistList[Math.floor(Math.random() * artistList.length)]
  if (roundUsedArtists.indexOf(newArtist) > -1 || newArtist === nextArtist) return ChooseNewArtist(roundUsedArtists, nextArtist)
  return newArtist.replace(/ /g, '+')
}
