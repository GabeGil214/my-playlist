import React, { useState, useEffect } from "react";
import qs from 'qs';
import axios from 'axios';
import UserProfile from './UserProfile';

function PlaylistContainer() {
  const [token, setToken] = useState(window.location.search.substring(6))
  const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
      const data = {
        grant_type: 'authorization_code',
        code: token,
        redirect_uri: 'http://localhost:8000/playlist'
      }

      if(token){
        axios.post(`https://accounts.spotify.com/api/token`, qs.stringify(data),
        {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
          }
        })
          .then(response  => {
            setAccessToken(response.data.access_token)
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },[])


  return (
    <div>
      {accessToken && (
        <PlaylistGenerator accessToken={accessToken} />
      )}
    </div>
  );
}

export default PlaylistContainer;
