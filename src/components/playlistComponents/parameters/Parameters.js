import React, { useState, useContext } from "react";
import { PlaylistContext } from '@contexts/playlistContext';
import { ParametersContext } from '@contexts/parametersContext';

function Parameters(){
  const parameters = useContext(ParametersContext);
  const playlist = useContext(PlaylistContext);
  const parametersDispatch = parameters[1];
  const playlistDispatch = playlist[1];
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
      <div className="form-container">
        <h3>Step 3: Let us know the qualities you'd like your playlist to have</h3>
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
