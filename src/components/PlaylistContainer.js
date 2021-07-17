import React, { useEffect, useState } from "react";
import qs from 'qs';
import axios from 'axios';
import UserProfile from './UserProfile';
import PlaylistGenerator from './PlaylistGenerator';
import { ParametersProvider } from '../reducers/parametersReducer.js'
import { useQueryParam, StringParam } from "use-query-params";
import { usePlaylist } from '../reducers/playlistReducer';

function PlaylistContainer(props) {
  const [ playlistState, dispatch ] = usePlaylist();
  const [ token, setToken ] = props.token;
  console.log("Playlist Container")

    useEffect(() => {
      // if(typeof localStorage.getItem('access_token') !== 'undefined'){
      //   dispatch({
      //     type: 'SET_ACCESS_TOKEN',
      //     payload: localStorage.getItem('access_token')
      //   })
      // } else {
        const data = {
          grant_type: 'authorization_code',
          code: token,
          redirect_uri: 'http://localhost:8000/playlist'
        }

        axios.get(`/.netlify/functions/fetchData?data=${data}`)
          .then(res  => {
            const response = res.json();
            dispatch({
              type: 'SET_ACCESS_TOKEN',
              payload: response.data.access_token
            })
            localStorage.setItem('access_token', response.data.access_token)
          })
          .catch(error => {
            console.log(error.body)
          })
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
