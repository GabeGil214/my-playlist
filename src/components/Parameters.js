import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function Parameters(props){
  const [ danceability, setDanceability ] = useState(0)
  const [ acousticness, setAcousticness ] = useState(0)
  const [ energy, setEnergy ] = useState(0)
  const [ speechiness, setSpeechiness ] = useState(0)
  const [ selectedArtists, setSelectedArtists ] = useState([])

  const getRecommendations = function(){

    axios.get(`https://api.spotify.com/v1/recommendations?limit=${playlistLength}&seed_artists=${selectedArtists}&target_danceability=${danceability}&target_acousticness=${acousticness}&target_energy=${energy}&target_speechiness=${speechiness}`)
      .then(response => {
        const trackIDs = getTrackIDs(response.data)
        <Redirect to="review" />
      })
  }

  const updateSelectedArtists = function(artist){

  }

  return (
    <div>
      <h2>Step 2: Select Artists to Use as Basis For Your Playlist</h2>
      {selectedArtists ? selectedArtists.map(artist => {
        <img src={artist.thumbnail} alt={artist.name} />
        :
        <p>No artists selected</p>
      })}
      <input type="search" value="Artist" placeholder="Search for artists" onChange={updateSelectedArtists(e.target.value)} />
    </div>
    <div>
      <h2>Step 3: Let us know the qualities you'd like your playlist to have</h2>
      <input value="danceability" placeholder="Danceability Value" onChange={setDanceability()} />
      <input value="acousticness" placeholder="Acousticness Value" onChange={setAcousticness()} />
      <input value="energy" placeholder="Energy Value" onChange={setEnergy()} />
      <input value="speechiness" placeholder="Speechiness Value" onChange={setSpeechiness()} />
    </div>
    <div>
      <h2>Step 4: How many songs do you want in your playlist?</h2>
      <input type="number" onChange={setPlaylistLength()} />
    </div>
    <button class="btn" onClick={getRecommendations()} value="Generate Playlist"/>
  )
}

export default Parameters

function getTrackIDs(songList){

  return trackIDs
}
