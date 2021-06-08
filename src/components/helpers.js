import axios from 'axios';

export function getTrackIDs(trackList){
  const tracksToAdd = trackList.filter(track => track.selectedForPlaylist = true)
  const trackIDs = tracksToAdd.map(track => (`spotify:track:${track.id}`))

  return trackIDs
}

export function getArtistIDs(artistList){
  const artistIDs = artistList.map(artist => (artist.id))

  return artistIDs
}
