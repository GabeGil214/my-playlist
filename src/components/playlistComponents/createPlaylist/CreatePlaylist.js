import React, { useState } from "react";
import { usePlaylist, createNewPlaylist } from '@app/contexts/playlistContext';
import Col from "react-bootstrap/Col"

function CreatePlaylist(){
  const [ playlistName, setPlaylistName ] = useState('');
  const [ state, dispatch ] = usePlaylist()
  const { userID, accessToken } = state
  console.log("Create Playlist")

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
