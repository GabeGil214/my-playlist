import axios from 'axios';

export function getTrackIDs(trackList){
  const trackIDs = trackList.map(track => (track.id))

  return trackIDs
}

export function getArtistIDs(artistList){
  const artistIDs = artistList.map(artist => (artist.id))

  return artistIDs
}
