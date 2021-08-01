import React, { useState } from "react"
import axios from 'axios'

import Button from "react-bootstrap/Button"

function Login(){
  const scopes = ["user-read-private", "user-read-email", "playlist-modify-public"]
  const redirectUri = process.env.NODE_ENV === 'development' ? "http://localhost:8000/playlist" : "https://mycustomplaylist.com/playlist"


  return (
    <Button size="lg">
      <a href={`https://accounts.spotify.com/authorize/?response_type=code&client_id=${process.env.GATSBY_CLIENT_ID}&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}&show_dialog=false`}>Login Now</a>
    </Button>
  )
}

export default Login
