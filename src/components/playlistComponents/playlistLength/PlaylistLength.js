import React, { useState, useContext } from "react";
import { ParametersContext } from '@contexts/parametersContext';
import { PlaylistContext, getRecommendations } from '@contexts/playlistContext';

function PlaylistLength(){
  const [ playlist, playlistDispatch ] = useContext(PlaylistContext);
  const [ parameters ] = useContext(ParametersContext);
  const [ numberOfTracks, setNumberOfTracks ] = useState(0);

  const handleRecommendations = function(){
    getRecommendations(parameters, playlist.accessToken, playlistDispatch, numberOfTracks)
  }

    return (
      <div className="form-container">
        <div>
          <h3>Step 4: How many songs do you want in your playlist?</h3>
          <input type="number" onChange={event => setNumberOfTracks(event.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={handleRecommendations}>Generate Playlist</button>
      </div>
    )
}




export default PlaylistLength
