import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import qs from 'qs';
import { PlaylistContext } from '../reducers/playlistReducer.js';
import { getTrackIDs } from './helpers.js';

function PlaylistPreview(props) {
  const [ playlistState, playlistDispatch ] = useContext(PlaylistContext);
  const [ trackList, setTrackList ] = useState(playlistState.trackList ? playlistState.trackList : [])
  const accessToken = localStorage.getItem('token');


  useEffect(() => {
    if(trackList === []){
      setTrackList(playlistState.trackList)
    }
  },[])

  const addSongsToPlaylist = function(){
    const data = {
      uris: getTrackIDs(trackList)
    }

    console.log(data)
    axios.post(`https://api.spotify.com/v1/playlists/${playlistState.id}/tracks`, data,
    {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + accessToken
      }
    })
  }

  const removeSong = function(index){
    const newTrackList = trackList;
    newTrackList[index].selectedForPlaylist = false
    setTrackList(newTrackList)
  }

  const addSong = function(index) {
    const newTrackList = trackList;
    newTrackList[index].selectedForPlaylist = true
    setTrackList(newTrackList)
  }

  return (
    <div className="playlist-preview">
      <h1>Here are your recommendend songs:</h1>
        {trackList.length > 0 && (
          trackList.map((track, index) => (
            <div key={track.id} className={track.selectedForPlaylist ? 'active' : 'inactive'}>
              <h2>{track.name}</h2>
              <p>{track.artists[0].name}</p>
              {
                track.selectedForPlaylist ?
                  <button className="remove" onClick={(index) => removeSong(index)}>-</button>
                  :
                  <button className="add" onClick={(index) => addSong(index)}>+</button>
              }
            </div>
            ))
          )
        }
      <button className="btn btn-primary" onClick={addSongsToPlaylist}>Add Songs to Playlist</button>
    </div>
  );
}

export default PlaylistPreview;
