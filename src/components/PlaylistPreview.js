import React, { useContext, useState } from "react";
import { PlaylistContext } from '../reducers/playlistReducer.js';

function PlaylistPreview(props) {
  const [ playlistState, playlistDispatch ] = useContext(PlaylistContext)
  const [ trackList, setTrackList ] = useState([])

  useEffect(() => {
    //get song information
    const songList = [];
    playlistState.trackIDs.map(trackID => {
      axios.get(`https://api.spotify.com/v1/tracks/${trackID}`)
        .then(response => {
          songList.push(response.data)
        })
    })
    setTrackList(songList);
  },[])

  const addSongsToPlaylist = function(songList){

  }

  return (
    <div className="playlist-preview">
      <h1>Here are your recommendend songs</h1>
        {
          songList.map(song => {
            <div>
              <h2>{song.title}</h2>
              <p>{song.artist}</p>
            </div>
          })
        }
    </div>
  );
}
export default PlaylistPreview;
