import React, { useContext, useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import { PlaylistContext } from '@contexts/playlistContext';
import { getTrackIDs } from '@components/helpers.js';

function PlaylistPreview() {
  const [ playlistState, playlistDispatch ] = useContext(PlaylistContext);
  const [ trackList, setTrackList ] = useState(playlistState.trackList ? playlistState.trackList : [])

  useEffect(() => {
    if(trackList.length === 0){
      setTrackList(playlistState.trackList)
    }
  },[trackList, playlistState])

  const addSongsToPlaylist = function(){
    const data = {
      uris: getTrackIDs(trackList)
    }

    axios.post(`https://api.spotify.com/v1/playlists/${playlistState.id}/tracks`, data,
    {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + playlistState.accessToken
      }
    })
    .then(response => {
      setTrackList([])
      playlistDispatch({
        type: 'NEXT_STEP',
        payload: 5
      })
    })
    .catch(error => {
      console.log(error)
    })


  }

  const removeSong = function(index){
    console.log(index)
    const newTrackList = [...trackList];
    console.log(newTrackList)
    newTrackList[index].selectedForPlaylist = false
    setTrackList(newTrackList)
  }

  const addSong = function(index) {
    const newTrackList = [...trackList];
    newTrackList[index].selectedForPlaylist = true
    setTrackList(newTrackList)
  }

  return (
    <div className="form-container">
      <h2>Here are your recommendend songs:</h2>
        {trackList.length > 0 && (
          trackList.map((track, index) => (
            <div key={track.id} className="song">
              <img src={track.album.images[1].url} className={`album-cover ${track.selectedForPlaylist ? 'active' : 'inactive'}`} alt={track.album.name} />
              <div className={`song-info ${track.selectedForPlaylist ? 'active' : 'inactive'}`}>
                <h4>{track.name}</h4>
                <p>{track.artists[0].name}</p>
              </div>
              <div className="button-holder">
                <button className={`add ${track.selectedForPlaylist ? 'inactive' : 'active'}`} aria-label="Add Song" type="button" onClick={() => addSong(index)}><FaPlus size={'1.2rem'} /></button>
                  <span>|</span>
                <button className={`remove ${track.selectedForPlaylist ? 'active' : 'inactive'}`} aria-label="Remove Song" type="button" onClick={() => removeSong(index)}><FaMinus size={'1.2rem'} /></button>
              </div>
            </div>
            ))
          )
        }
      <button className="btn btn-primary" onClick={addSongsToPlaylist}>Finalize Playlist</button>
    </div>
  );
}

export default PlaylistPreview;
