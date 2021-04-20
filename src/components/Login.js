import React, { useState } from "react"
import axios from 'axios'

import Card from "react-bootstrap/card"
import Button from "react-bootstrap/Button"

function Login(){
  const scopes = ["user-read-private", "user-read-email", "playlist-modify-public"]
  const redirectUri = "http://localhost:8000/playlist"


  return (
    <Card>
      <h3>Sign In To Spotify</h3>
      <a href={`https://accounts.spotify.com/authorize/?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}&show_dialog=false`}>Login to Spotify</a>
    </Card>
  )
}

export default Login
