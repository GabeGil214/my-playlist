import React, { useReducer, createContext } from 'react';
import axios from 'axios';

const initialPlaylistState = {
    trackList: [],
    playlistID: '',
    currentView: 0,
};

export const PlaylistContext = createContext()

export const playlistReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_PLAYLIST':
            return {
              ...state,
              playlistID: action.payload
            }
        case 'POPULATE_TRACKLIST':
            return {
              ...state,
              trackList: action.payload
            }
        case 'NEXT_STEP':
            return {
              ...state,
              currentView: action.payload
            }
        case 'ADD_TRACK':
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


function PlaylistProvider({children}) {
  const [state, dispatch] = useReducer(playlistReducer, initialPlaylistState);

  return (
    <PlaylistContext.Provider value={[state, dispatch]}>
      {children}
    </PlaylistContext.Provider>
  )
}

function usePlaylist() {
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
    dispatch({
      type: 'CREATE_PLAYLIST',
      payload: playlistName
    })

    dispatch({
      type: 'NEXT_STEP',
      payload: 1
    })
  })
  .catch(error => {
    console.log(error)
  })

}

export {PlaylistProvider, usePlaylist, createNewPlaylist}
