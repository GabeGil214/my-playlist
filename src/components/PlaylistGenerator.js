import React, { useState, useEffect, useContext, Fragment } from "react";
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import UserProfile from './UserProfile';
import CreatePlaylist from './CreatePlaylist';
import Parameters from './Parameters';
import PlaylistPreview from './PlaylistPreview';
import { PlaylistContext } from '../reducers/playlistReducer.js';
import PlaylistLength from './PlaylistLength';
import SeedArtists from './SeedArtists';
import ConfirmationPage from './ConfirmationPage';

function PlaylistGenerator(props){
  const [ currentViewHeight, setCurrentViewHeight ] = useState(0)
  const [ playlistState, dispatch ] = useContext(PlaylistContext)

  useEffect(() => {
    resizeElementHeight()
  }, [])

  const resizeElementHeight = function() {
    let height;
    height = document.getElementsByClassName(".form-container")
    setCurrentViewHeight(height[playlistState.currentView])
  }

  return (
      <Fragment>
        <SwipeableViews
          disabled={true}
          index={playlistState.currentView}
          style={{height: currentViewHeight}} >
          <CreatePlaylist />
          <SeedArtists />
          <Parameters />
          <PlaylistLength />
          <PlaylistPreview />
          <ConfirmationPage />
        </SwipeableViews >
      </Fragment>
  )
}

export default PlaylistGenerator
