import React, { useState, useEffect, useContext, Fragment } from "react";
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import UserProfile from './UserProfile';
import CreatePlaylist from './CreatePlaylist';
import Parameters from './Parameters';
import PlaylistPreview from './PlaylistPreview';
import { PlaylistContext } from '../reducers/playlistReducer.js';

function PlaylistGenerator(props){
  const [userData, setUserData] = useState({})
  const [ playlistState, playlistDispatch ] = useContext(PlaylistContext)
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
      <SwipeableViews
        disabled={true}
        index={playlistState.currentView}>
        <CreatePlaylist
          accessToken={accessToken}
          userData={userData}
          />
        <Parameters
          accessToken={accessToken}
          />
        <PlaylistPreview />
      </SwipeableViews>
    </Fragment>
  )
}

export default PlaylistGenerator
