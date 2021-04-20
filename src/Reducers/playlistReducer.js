import React, { useReducer, createContext } from 'react';

const initialPlaylistState = {
    trackIDs: [],
    playlistID: ''
};

export const PlaylistContext = createContext()

export const playlistReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_PLAYLIST':
            return {
              ...state,
              playlistID: action.payload
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


export const PlaylistContextProvider = props => {
  const [state, dispatch] = useReducer(playlistReducer, initialPlaylistState);

  return (
    <PlaylistContext.Provider value={[state, dispatch]}>
      {props.children}
    </PlaylistContext.Provider>
  )
}
