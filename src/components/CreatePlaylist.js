import React, { useState, useContext } from "react";
import { usePlaylist, createNewPlaylist } from '../reducers/playlistReducer.js';
import Col from "react-bootstrap/Col"

import axios from 'axios';

function CreatePlaylist(){
  const [ playlistName, setPlaylistName ] = useState('');
  const [ state, dispatch ] = usePlaylist()
  const { userID, accessToken } = state
  console.log(state)

  const handleNewPlaylist = function() {
    createNewPlaylist(dispatch, playlistName, userID, accessToken)
  }

  return (
    <Col className="form-container" sm={12}>
      <h3>Step 1: Name Your Playlist</h3>
      <input type="text" name="Playlist Name" placeholder="Playlist Name" onChange={event => setPlaylistName(event.target.value)} />
      <button className="btn btn-primary" onClick={handleNewPlaylist}>Create Playlist</button>
    </Col>
  )
}

export default CreatePlaylist
