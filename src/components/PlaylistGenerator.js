import React, { useContext, Fragment } from "react";
import SwipeableViews from 'react-swipeable-views';
import CreatePlaylist from './CreatePlaylist';
import Parameters from './Parameters';
import PlaylistPreview from './PlaylistPreview';
import { PlaylistContext } from '../reducers/playlistReducer.js';
import PlaylistLength from './PlaylistLength';
import SeedArtists from './SeedArtists';
import ConfirmationPage from './ConfirmationPage';

function PlaylistGenerator(props){
  const [ playlistState ] = useContext(PlaylistContext)

  return (
      <Fragment>
        <SwipeableViews
          disabled={true}
          index={playlistState.currentView}
          >
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
