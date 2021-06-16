import React, { useState, useEffect, useContext } from "react";
import { usePlaylist } from '../reducers/playlistReducer';
import axios from 'axios';

function UserProfile(){
  const [userData, setUserData] = useState({})
  const [ displayStatus, setDisplayStatus ] = useState('hidden')
  const [ playlistState, dispatch ] = usePlaylist()
  const accessToken = localStorage.getItem('token')

  useEffect(() => {
    axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(response => {
      dispatch({
        type: 'SET_USER',
        payload: response.data.id
      })
      setUserData(response.data)
      setDisplayStatus('active')
    })
    .catch(error => {
      console.log(error.response)
    })
  }, [])

  const getFirstLetter = function(userInfo){
    const username = userInfo.display_name ? userInfo.display_name : 'test';
    const uppercaseName = username.toUpperCase()

    return uppercaseName[0]
  }

  return (
    <div className={displayStatus + ' user-info'}>
      <span>{getFirstLetter(userData)}</span>
      <h2 className="hidden-sm">Signed In As {userData.display_name}</h2>
    </div>
  )
}

export default UserProfile
