import React, { useState, useEffect } from "react";

function UserProfile(props){
  const { accessToken } = props

  useEffect(() => {
    axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': {accessToken}
      }
    })
    .then(response => {
      console.log(response)
    })
  })

  return (

  )
}

export default UserProfile
