import React, { useReducer, createContext } from 'react';
import axios from 'axios';

const initialParametersState = {
    seedArtists: [],
    speechiness: 50,
    acousticness: 50,
    energy: 50,
    danceability: 50,
    playlistLength: 25

};

export const ParametersContext = createContext()

export const parametersReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ARTISTS':
            return {
              ...state,
              seedArtists: action.payload
            }
        case 'SET_PARAMETERS':
            return {
              ...state,
              speechiness: action.payload.speechiness,
              acousticness: action.payload.acousticness,
              energy: action.payload.energy,
              danceability: action.payload.danceability,
            }
        case 'SET_PLAYLIST_LENGTH':
          return {
            ...state,
            playlistLength: action.payload
          }
        default:
            return state;
    }
};


export const ParametersProvider = props => {
  const [state, dispatch] = useReducer(parametersReducer, initialParametersState);

  return (
    <ParametersContext.Provider value={[state, dispatch]}>
      {props.children}
    </ParametersContext.Provider>
  )
}



// function useParameters() {
//   const context = React.useContext(ParametersContext)
//   if (context === undefined) {
//     throw new Error('useParameters must be used within a ParametersProvider')
//   }
//   return context
// }
