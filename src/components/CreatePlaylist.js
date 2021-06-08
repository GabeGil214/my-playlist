import React, { useState, useContext } from "react";
import { usePlaylist, createNewPlaylist } from '../reducers/playlistReducer.js';
import axios from 'axios';

function CreatePlaylist(props){
  const [ playlistName, setPlaylistName ] = useState('');
  const [ state, dispatch ] = usePlaylist()
  const { id } = props.userData

  const handleNewPlaylist = function() {
    createNewPlaylist(dispatch, playlistName, id, props.accessToken)
  }

  return (
    <div>
      <h1>Step 1: Create Your New Playlist</h1>
      <input type="text" name="Playlist Name" onChange={event => setPlaylistName(event.target.value)} />
      <button className="btn btn-primary" onClick={handleNewPlaylist}>Create Playlist</button>
    </div>
  )
}

export default CreatePlaylist
