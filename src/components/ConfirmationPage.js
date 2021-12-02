import React, { useContext, useEffect } from 'react';

import { PlaylistContext } from '../reducers/playlistReducer.js';


function ConfirmationPage() {
  const [ playlist ] = useContext(PlaylistContext);

  return (
    <div className="form-container">
      <h2>Your Playlist has been created!</h2>
      <p>You can start listening now! Click the link below to start listening.</p>
      <a href={`https://open.spotify.com/playlist/${playlist.id}`}>Go to playlist</a>
    </div>
  )
}

export default ConfirmationPage
