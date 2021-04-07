import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import UserProfile from './UserProfile';
import CreatePlaylist from './CreatePlaylist';
import Parameters from './Parameters';


function PlaylistGenerator(props){
  const [userData, setUserData] = useState({})
  const { accessToken } = props;

  useEffect(() => {
    axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(response => {
      setUserData(response.data)
    })
    .catch(error => {
      console.log(error.response)
    })
  }, [])

  return (
    <Fragment>
      <UserProfile userData={userData} />
      <CreatePlaylist
        accessToken={accessToken}
        userData={userData}
        />
    </Fragment>
  )
}

export default PlaylistGenerator


// <Parameters
//   accessToken={accessToken}
//   playlistID={playlistID}
//   />
