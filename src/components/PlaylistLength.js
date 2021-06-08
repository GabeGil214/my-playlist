import React, { useState, useEffect, Fragment, useContext } from "react";
import { ParametersContext } from '../reducers/parametersReducer';
import { PlaylistContext, getRecommendations } from '../reducers/playlistReducer';

function PlaylistLength(props){
  const [ playlist, playlistDispatch ] = useContext(PlaylistContext);
  const [ parameters, paramsDispatch ] = useContext(ParametersContext);
  const [ numberOfTracks, setNumberOfTracks ] = useState(0);
  const { accessToken } = props;


  const handleRecommendations = function(){
    getRecommendations(parameters, accessToken, playlistDispatch, numberOfTracks)
  }

    return (
      <Fragment>
        <div>
          <h2>Step 4: How many songs do you want in your playlist?</h2>
          <input type="number" onChange={event => setNumberOfTracks(event.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={handleRecommendations}>Generate Playlist</button>
      </Fragment>
    )
}




  export default PlaylistLength
