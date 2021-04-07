import React, { useState } from "react";
import axios from 'axios';

function CreatePlaylist(props){
  const [ playlistName, setPlaylistName ] = useState('');
  const { id } = props.userData

  const createNewPlaylist = function() {
    axios.post(`https://api.spotify.com/v1/users/${id}/playlists`, {
      name: playlistName
    },
    {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + props.accessToken
      }
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  return (
    <div>
      <h1>Step 1: Create Your New Playlist</h1>
      <input type="text" name="Playlist Name" onChange={event => setPlaylistName(event.target.value)} />
      <button className="btn btn-primary" onClick={createNewPlaylist}>Create Playlist</button>
    </div>
  )
}

export default CreatePlaylist
