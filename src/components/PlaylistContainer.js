import React, { useEffect, useState } from "react";
import qs from 'qs';
import axios from 'axios';
import UserProfile from './UserProfile';
import PlaylistGenerator from './PlaylistGenerator';
import { PlaylistProvider } from '../reducers/playlistReducer.js'
import { ParametersProvider } from '../reducers/parametersReducer.js'

function PlaylistContainer() {
  const [ accessToken, setAccessToken ] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
  const token = window.location.search.substring(6)

    useEffect(() => {
      const data = {
        grant_type: 'authorization_code',
        code: token,
        redirect_uri: 'http://localhost:8000/playlist'
      }

        axios.post(`https://accounts.spotify.com/api/token`, qs.stringify(data),
        {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
          }
        })
          .then(response  => {
            setAccessToken(response.data.access_token)
            localStorage.setItem('token', response.data.access_token)
          })
          .catch(error => {
            console.log(error.response)
          })
    },[])


  return (
    <ParametersProvider>
        {accessToken.length && (
          <PlaylistGenerator accessToken={accessToken} />
        )}
    </ParametersProvider>
  );
}

export default PlaylistContainer;
