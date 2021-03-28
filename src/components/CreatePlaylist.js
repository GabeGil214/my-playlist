import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function CreatePlaylist(props){
  const [ playlistName, setPlaylistName ] = useState('');

  const createNewPlaylist = function() {
    axios.post(`https://api.spotify.com/v1/users/${props.userID}/playlists`)

  }

  return (
    <div>
      <h1>Step 1: Create Your New Playlist</h1>
      <input value="name" placeholder="Playlist Name" onChange={setPlaylistName()} />
      <btn class="btn" onClick={createNewPlaylist()} />
    </div>
  )
}

export default CreatePlaylist
