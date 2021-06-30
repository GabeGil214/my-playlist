import React, { useState, useEffect, Fragment, useContext } from 'react';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import { ParametersContext } from '../reducers/parametersReducer';
import { PlaylistContext } from '../reducers/playlistReducer';
import axios from 'axios';
import Img from 'gatsby-image';

function SeedArtists(props){
  const [ selectedArtists, setSelectedArtists ] = useState([]);
  const [ queryResponse, setQueryResponse ] = useState([]);
  const [ errorResponse, setErrorResponse ] = useState('');
  const [ parameters, parametersDispatch ] = useContext(ParametersContext);
  const [ playlist, playlistDispatch ] = useContext(PlaylistContext);
  const { accessToken } = props;

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

  const saveArtistSelection = function(){
      parametersDispatch({
        type: 'ADD_ARTISTS',
        payload: selectedArtists
      })

      playlistDispatch({
        type: 'NEXT_STEP',
        payload: 2
      })
  }

  const updateArtistSelection = artist => {
    const artistSelection = [...selectedArtists];
    artistSelection.push(artist)
    setSelectedArtists(artistSelection)
    console.log(artistSelection)
  }

  return (
    <div className="form-container">
      <h3>Step 2: Select Artists to Use as Basis For Your Playlist</h3>
      <ul className="selected-artists">
        {selectedArtists.length ? selectedArtists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
          ))
          :
          <li>No artists selected</li>
        }
      </ul>
      <input type="search" placeholder="Search for artists" onChange={event => updateSearchResults(event.target.value)} />
      <div className="artists">
        <ul className="search-dropdown">
          {queryResponse && ( queryResponse.map(artist => (
            <li key={artist.id}>
              {
                artist.images[2] ? <img src={artist.images[2].url} alt={artist.name} onClick={() => updateArtistSelection(artist)} className="artist-img"/> :
                <Img fluid={data.placeholderImage.childImageSharp.fluid} alt={artist.name} onClick={() => updateArtistSelection(artist)} className="artist-img"/>
              }
              {artist.name}
            </li>
          )))}
        </ul>
      </div>
      <button className="btn btn-primary" onClick={saveArtistSelection}>Next Step</button>
    </div>
  )
}

export default SeedArtists
