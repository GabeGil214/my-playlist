import React, { useContext, useState } from "react";
import axios from 'axios';
import { PlaylistContext } from '../reducers/playlistReducer.js';
import getTrackIDs from './helpers.js';

function PlaylistPreview(props) {
  const [ playlistState, playlistDispatch ] = useContext(PlaylistContext);
  const trackList = playlistState.trackList
  const accessToken = localStorage.getItem('token');


  // const addSongsToPlaylist = function(songList){
  //   const trackListIDs = getTrackIDs(songList);
  //   axios.post(`https://api.spotify.com/v1/playlists/${playlistState.id}/tracks`, {
  //     uris: [trackListIDs]
  //   },
  //   {
  //     headers: {
  //       'Content-Type' : 'application/json',
  //       'Authorization' : 'Bearer ' + accessToken
  //     }
  //   })
  // }
  //
  // const removeSong = function(song){
  //   const songList = trackList;
  //   songList.splice(song)
  //   setTrackList(songList);
  // }

  return (
    <div className="playlist-preview">
      <h1>Here are your recommendend songs</h1>
        {
          trackList.map(track => (
            <div>
              <h2>{track.title}</h2>
              <p>{track.artist}</p>
            </div>
          ))
        }
    </div>
  );
}

export default PlaylistPreview;
