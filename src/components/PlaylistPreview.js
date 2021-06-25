import React, { useContext, useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import qs from 'qs';
import { PlaylistContext } from '../reducers/playlistReducer.js';
import { getTrackIDs } from './helpers.js';

function PlaylistPreview(props) {
  const [ playlistState, playlistDispatch ] = useContext(PlaylistContext);
  const [ trackList, setTrackList ] = useState(playlistState.trackList ? playlistState.trackList : [])
  const accessToken = localStorage.getItem('token');
  console.log(trackList)
  console.log(playlistState)


  useEffect(() => {
    if(trackList.length === 0){
      setTrackList(playlistState.trackList)
    }
  },[playlistState])

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
    <div className="form-container">
      <h2>Here are your recommendend songs:</h2>
        {trackList.length > 0 && (
          trackList.map((track, index) => (
            <div key={track.id} className={`song ${track.selectedForPlaylist ? 'active' : 'inactive'}`}>
              <img src={track.album.images[1].url} className="album-cover" alt={track.album.name} />
              <div className="song-info">
                <h4>{track.name}</h4>
                <p>{track.artists[0].name}</p>
              </div>
              <div className="button-holder">
                <button className={`add ${track.selectedForPlaylist ? 'inactive' : 'active '}`} onClick={(index) => addSong(index)}><FaPlus size={'2rem'} /></button>
                  <span>|</span>
                <button className={`remove ${track.selectedForPlaylist ? 'active' : 'inactive '}`} onClick={(index) => removeSong(index)}><FaMinus size={'2rem'} /></button>
              </div>
            </div>
            ))
          )
        }
      <button className="btn btn-primary" onClick={addSongsToPlaylist}>Add Songs to Playlist</button>
    </div>
  );
}

export default PlaylistPreview;
