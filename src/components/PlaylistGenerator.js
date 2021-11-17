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
  console.log("Playlist Generator")
  const [ playlistState, dispatch ] = useContext(PlaylistContext)

  return (
      <Fragment>
        <SwipeableViews
          disabled={true}
          index={playlistState.currentView} >
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
