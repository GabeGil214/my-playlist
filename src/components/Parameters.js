import React, { useState, useEffect, Fragment, useContext } from "react";
import { navigate, useStaticQuery, graphql } from 'gatsby';
import { PlaylistContext } from '../reducers/playlistReducer.js';
import getTrackIDs from './helpers.js';
import Img from "gatsby-image"
import axios from 'axios';

function Parameters(props){
  const [ playlistState, playlistDispatch ] = useContext(PlaylistContext)
  const [ danceability, setDanceability ] = useState(0)
  const [ acousticness, setAcousticness ] = useState(0)
  const [ energy, setEnergy ] = useState(0)
  const [ speechiness, setSpeechiness ] = useState(0)
  const [ selectedArtists, setSelectedArtists ] = useState([])
  const [ playlistLength, setPlaylistLength ] = useState(0)
  const [ queryResponse, setQueryResponse ] = useState([])
  const [ errorResponse, setErrorResponse ] = useState('')
  const [ accessToken, setAccessToken ] = useState(props.accessToken)

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "artist.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 160) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const getRecommendations = function(){
    const artistIDs = selectedArtists.map(artist => (artist.id))
    axios.get(`https://api.spotify.com/v1/recommendations?limit=${playlistLength}&seed_artists=${artistIDs}&target_danceability=${danceability}&target_acousticness=${acousticness}&target_energy=${energy}&target_speechiness=${speechiness}`,
      {
        headers: {
        'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => {
        playlistDispatch({
          type: 'POPULATE_TRACKLIST',
          payload: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })

    }

  const updateSearchResults = function(searchQuery){
    axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist&limit=5`,
      {
        headers: {
        'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => {
        console.log(response)
        setQueryResponse(response.data.artists.items)
      })
      .catch(error => {
        console.log(error)
        setErrorResponse('Something went wrong. Please try again.')
      })

  }

  const updateArtistSelection = function(artist){
    const artistSelection = selectedArtists;
    console.log(artist)
    artistSelection.push(artist)
    setSelectedArtists(artistSelection)
    console.log(selectedArtists)
  }

  return (
    <Fragment>
      <div>
        <h2>Step 2: Select Artists to Use as Basis For Your Playlist</h2>
        <ul>
          {selectedArtists.length ? selectedArtists.map(artist => (
            <li key={artist.id}>{artist.name}</li>
            ))
            :
            <li>No artists selected</li>
          }
        </ul>
        <input type="search" placeholder="Search for artists" onChange={event => updateSearchResults(event.target.value)} />
        <ul className="search-dropdown">
          {queryResponse && ( queryResponse.map(artist => (
            <li key={artist.id}>
              {
                artist.images[2] ? <img src={artist.images[2].url} alt={artist.name} onClick={() => updateArtistSelection(artist)} className="artist-img"/> :
                <Img fluid={data.placeholderImage.childImageSharp.fluid} alt={artist.name} onClick={() => setSelectedArtists(selectedArtists.push(artist))} className="artist-img"/>
              }
              {artist.name}
            </li>
          )))}
        </ul>
      </div>
      <div>
        <h2>Step 3: Let us know the qualities you'd like your playlist to have</h2>
        <p>Danceability:
          <input type="range" min="1" max="100" placeholder="Danceability Value" onChange={event => setDanceability(event.target.value)} />
        </p>
        <p>Acousticness:
          <input type="range" min="1" max="100" placeholder="Acousticness Value" onChange={event => setAcousticness(event.target.value)} />
        </p>
        <p>Energy:
          <input type="range" min="1" max="100" placeholder="Energy Value" onChange={event => setEnergy(event.target.value)} />
        </p>
        <p>Speechiness:
          <input type="range" min="1" max="100" placeholder="Speechiness Value" onChange={event => setSpeechiness(event.target.value)} />
        </p>
      </div>
      <div>
        <h2>Step 4: How many songs do you want in your playlist?</h2>
        <input type="number" onChange={event => setPlaylistLength(event.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={getRecommendations}>Generate Playlist</button>
    </Fragment>
  )
}

export default Parameters
