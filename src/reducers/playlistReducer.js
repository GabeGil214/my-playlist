import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import { navigate } from "gatsby"

const initialPlaylistState = {
    trackList: [],
    id: '',
    name: '',
    currentView: 0,
    userID: '',
    accessToken: ''
};

export const PlaylistContext = createContext()

export const playlistReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_PLAYLIST':
            return {
              ...state,
              id: action.payload.id,
              name: action.payload.name
            }
        case 'POPULATE_TRACKLIST':
            return {
              ...state,
              trackList: action.payload.map(track => { return {...track, selectedForPlaylist: true}}),
            }
        case 'SET_USER':
            return {
              ...state,
              userID: action.payload,
            }
        case 'NEXT_STEP':
            return {
              ...state,
              currentView: action.payload
            }
        case 'SET_ACCESS_TOKEN':
            return {
              ...state,
              accessToken: action.payload
            }
        case 'ADD_TRACKS_TO_PLAYLIST':
            return {
                trackIDs: [...state],
            };
        case 'REMOVE_TRACK':
            return {
                trackIDs: [...state]
            };
        default:
            return state;
    }
};


export const PlaylistProvider = props => {
  const [state, dispatch] = useReducer(playlistReducer, initialPlaylistState);

  return (
    <PlaylistContext.Provider value={[state, dispatch]}>
      {props.children}
    </PlaylistContext.Provider>
  )
}

export const usePlaylist = () => {
  const context = React.useContext(PlaylistContext)
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider')
  }
  return context
}

function createNewPlaylist(dispatch, playlistName, id, accessToken){
 axios.post(`https://api.spotify.com/v1/users/${id}/playlists`, {
    name: playlistName
  },
  {
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + accessToken
    }
  })
  .then(response => {
    console.log(response)
    dispatch({
      type: 'CREATE_PLAYLIST',
      payload: response.data
    })

    dispatch({
      type: 'NEXT_STEP',
      payload: 1
    })
  })
  .catch(error => {
    console.log(error.response)
  })

}

function getRecommendations(parameters, accessToken, dispatch, numberOfTracks){
  const { seedArtists, acousticness, danceability, energy, speechiness } = parameters;
  const artistIDs = seedArtists.map(artist => (artist.id))

  axios.get(`https://api.spotify.com/v1/recommendations?limit=${numberOfTracks}&seed_artists=${artistIDs}&target_danceability=${danceability}&target_acousticness=${acousticness}&target_energy=${energy}&target_speechiness=${speechiness}`,
    {
      headers: {
      'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(response => {
      console.log(response.data)
      dispatch({
        type: 'POPULATE_TRACKLIST',
        payload: response.data.tracks,
      })

      dispatch({
        type: 'NEXT_STEP',
        payload: 4
      })
    })
    .catch(error => {
      console.log(error)
    })
}

function getAccessToken(url, method, data, headers, dispatch){
  axios({
    method: method,
    url: url,
    headers: headers
  })
  .then(response  => {
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: response.data.access_token
    })
    localStorage.setItem('access_token', response.data.access_token)
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
}

export {createNewPlaylist, getRecommendations, getAccessToken}
