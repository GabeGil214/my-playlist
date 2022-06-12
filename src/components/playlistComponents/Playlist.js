import React, { useEffect } from "react";
import PlaylistGenerator from '@components/playlistComponents/playlistGenerator/PlaylistGenerator';
import { ParametersProvider } from '@contexts/parametersContext'
import { useQueryParam, StringParam } from "use-query-params";
import { usePlaylist, getAccessToken } from '@contexts/playlistContext';

function Playlist(props) {
  const [ playlistState, dispatch ] = usePlaylist();
  const [ token ] = useQueryParam('code', StringParam);

    useEffect(() => {
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

      const urlPath = process.env.NODE_ENV === 'production' ? `/.netlify/functions/fetchData?code=${data}` : `https://accounts.spotify.com/api/token`

      getAccessToken(urlPath, method, data, headers, dispatch)
    },[dispatch, token])


  return (
    <ParametersProvider>
        {playlistState.accessToken.length && (
          <PlaylistGenerator />
        )}
    </ParametersProvider>
  );
}

export default Playlist;
