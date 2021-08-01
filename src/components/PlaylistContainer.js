import React, { useEffect, useState } from "react";
import qs from 'qs';
import axios from 'axios';
import UserProfile from './UserProfile';
import PlaylistGenerator from './PlaylistGenerator';
import { ParametersProvider } from '../reducers/parametersReducer.js'
import { useQueryParam, StringParam } from "use-query-params";
import { usePlaylist, getAccessToken } from '../reducers/playlistReducer';

function PlaylistContainer(props) {
  const [ playlistState, dispatch ] = usePlaylist();
  const [ token, setToken ] = useQueryParam('code', StringParam);
  console.log("Playlist Container")
  console.log(token)


    useEffect(() => {
      // if(typeof localStorage.getItem('access_token') !== 'undefined'){
      //   dispatch({
      //     type: 'SET_ACCESS_TOKEN',
      //     payload: localStorage.getItem('access_token')
      //   })
      // } else {
      const method = process.env.NODE_ENV === 'production' ? 'GET' : 'POST'
      const headers = process.env.NODE_ENV === 'production' ? {} : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(process.env.GATSBY_CLIENT_ID + ':' + process.env.CLIENT_SECRET)
      }
      const data = process.env.NODE_ENV === 'production' ? token : {
        grant_type: 'authorization_code',
        code: token,
        redirect_uri: 'http://localhost:8000/playlist'
      }
      const urlPath = process.env.NODE_ENV === 'production' ? `/.netlify/functions/fetchData?data=${data}` : `https://accounts.spotify.com/api/token`

      getAccessToken(urlPath, method, data, headers, dispatch)
      // }
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
