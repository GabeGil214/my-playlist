import React, { useState, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ParametersContext } from '../../../contexts/parametersContext';
import { PlaylistContext } from '../../../contexts/playlistContext';
import axios from 'axios';
import Img from 'gatsby-image';

function SeedArtists(props){
  const [ selectedArtists, setSelectedArtists ] = useState([]);
  const [ queryResponse, setQueryResponse ] = useState([]);
  const [ errorResponse, setErrorResponse ] = useState('');
  const parameters = useContext(ParametersContext);
  const parametersDispatch = parameters[1];
  const [ playlist, playlistDispatch ] = useContext(PlaylistContext);

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
        'Authorization': 'Bearer ' + playlist.accessToken
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

    if (artistSelection.length === 5){
      setErrorResponse("You have reached the maximum amount of artists allowed.")
    } else if(isArtistAlreadySelected(artistSelection, artist)){
      setErrorResponse("Artist has already been selected.")
    } else {
      setErrorResponse("")
      artistSelection.push(artist)
      setSelectedArtists(artistSelection)
    }
  }

  const removeArtistSelection = removedArtist => {
    const artistSelection = [...selectedArtists];
    const newArtistSelection = artistSelection.filter(artist => artist.name !== removedArtist.name)

    setSelectedArtists(newArtistSelection)
  }


  const isArtistAlreadySelected = function(artistList, artist){
    let isArtistSelected = false;

    artistList.forEach(currentArtist => {
      if(currentArtist.name === artist.name){
        isArtistSelected = true;
      }})

      return isArtistSelected;
  }

  const handleKeyPress = function(artist, event){
    if(event.key === 'Enter'){
      updateArtistSelection(artist)
    }
  }

  return (
    <div className="form-container">
      {errorResponse && (
        <div className="error-modal">
          <div className="error-message">
            <p>{errorResponse}</p>
          </div>
        </div>
      )}
      <h3>Step 2: Select Artists to Use as Basis For Your Playlist</h3>
      <ul className="selected-artists">
        {selectedArtists.length ? selectedArtists.map(artist => (
          <li key={artist.id}>{artist.name}<span role="button" onKeyPress={(event) => handleKeyPress(artist, event)} onClick={() => removeArtistSelection(artist)} className="remove-button">X</span></li>
          ))
          :
          <li>No artists selected</li>
        }
      </ul>
      <input type="search" placeholder="Search for artists" onChange={event => updateSearchResults(event.target.value)} />
      <div className="artists">
        <ul className="search-dropdown">
          {queryResponse && ( queryResponse.map(artist => (
            <li
              className={isArtistAlreadySelected(selectedArtists, artist) ? 'active artist' : 'artist' }
              key={artist.id}
              onKeyPress={(event) => handleKeyPress(artist, event)}
              onClick={() => updateArtistSelection(artist)}
              role="button"
              >
              {
                artist.images[2] ? <img src={artist.images[2].url} alt={artist.name} className="artist-img"/> :
                <div className="artist-img"><Img fluid={data.placeholderImage.childImageSharp.fluid} alt={artist.name} imgStyle={{borderRadius: '50%',}}/></div>
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
