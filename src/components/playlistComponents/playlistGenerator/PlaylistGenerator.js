import React, { useContext, Fragment } from "react";
import SwipeableViews from 'react-swipeable-views';
import CreatePlaylist from '@components/playlistComponents/createPlaylist/CreatePlaylist';
import Parameters from '@components/playlistComponents/parameters/Parameters';
import PlaylistPreview from '@components/playlistComponents/playlistPreview/PlaylistPreview';
import { PlaylistContext } from '@contexts/playlistContext';
import PlaylistLength from '@components/playlistComponents/playlistLength/PlaylistLength';
import SeedArtists from '@components/playlistComponents/seedArtists/SeedArtists';
import ConfirmationPage from '@components/playlistComponents/confirmationPage/ConfirmationPage';

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
