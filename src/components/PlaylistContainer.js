import React, { useEffect, useState } from "react";
import qs from 'qs';
import axios from 'axios';
import UserProfile from './UserProfile';
import PlaylistGenerator from './PlaylistGenerator';
import { ParametersProvider } from '../reducers/parametersReducer.js'
import { useQueryParam, StringParam } from "use-query-params";
import { usePlaylist } from '../reducers/playlistReducer';

function PlaylistContainer() {
  const [ playlistState, dispatch ] = usePlaylist();
  const [ token, setToken ] = useQueryParam('code', StringParam);

    useEffect(() => {
      if(typeof localStorage.getItem('token') !== 'undefined'){
        dispatch({
          type: 'SET_ACCESS_TOKEN',
          payload: localStorage.getItem('token')
        })
      } else {
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
          dispatch({
            type: 'SET_ACCESS_TOKEN',
            payload: response.data.access_token
          })
          localStorage.setItem('token', response.data.access_token)
        })
        .catch(error => {
          console.log(error.response)
        })
      }
    },[])


  return (
    <ParametersProvider>
        {playlistState.accessToken.length && (
          <PlaylistGenerator />
        )}
    </ParametersProvider>
  );
}

export default PlaylistContainer;
