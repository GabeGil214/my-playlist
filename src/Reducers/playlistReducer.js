import React, { useReducer, createContext } from 'react';

export const PlaylistContext = createContext({})

const initialPlaylistState = {
    trackIDs: [],
    playlistID: 0
};

export const playlistReducer = (state, action) => {
    switch (action.type) {
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
