import React, { useState, useEffect, Fragment, useContext } from "react";
import { PlaylistContext } from '../reducers/playlistReducer.js';
import { ParametersContext } from '../reducers/parametersReducer';
import getTrackIDs from './helpers.js';

function Parameters(){
  const [ parameters, parametersDispatch ] = useContext(ParametersContext);
  const [ playlist, playlistDispatch ] = useContext(PlaylistContext);
  const [ danceability, setDanceability ] = useState(0)
  const [ acousticness, setAcousticness ] = useState(0)
  const [ energy, setEnergy ] = useState(0)
  const [ speechiness, setSpeechiness ] = useState(0)

  const saveParametersSelection = function(){
      parametersDispatch({
        type: 'SET_PARAMETERS',
        payload: {
          danceability,
          acousticness,
          energy,
          speechiness,
        }
      })

      playlistDispatch({
        type: 'NEXT_STEP',
        payload: 3
      })
  }

  return (
      <div>
        <h2>Step 3: Let us know the qualities you'd like your playlist to have</h2>
        <p>Danceability:
          <input type="range" min="1" max="100" placeholder="Danceability Value" onChange={event => setDanceability(event.target.value)} />
        </p>
        <p>Acousticness:
          <input type="range" min="1" max="100" placeholder="Acousticness Value" onChange={event => setAcousticness(event.target.value)} />
        </p>
        <p>Energy:
          <input type="range" min="1" max="100" placeholder="Energy Value" onChange={event => setEnergy(event.target.value)} />
        </p>
        <p>Speechiness:
          <input type="range" min="1" max="100" placeholder="Speechiness Value" onChange={event => setSpeechiness(event.target.value)} />
        </p>
        <button className="btn btn-primary" onClick={saveParametersSelection}>Next Step</button>
      </div>
  )
}

export default Parameters
