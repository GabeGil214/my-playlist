import React, { useState } from "react"
import axios from 'axios'

import Card from "react-bootstrap/card"
import Button from "react-bootstrap/Button"

function Login(){
  const scopes = ["user-read-private", "user-read-email"]
  const redirectUri = "http://localhost:8000"

  const [token, setToken] = useState("")

  const userLogin = function() {

    axios.get(`https://accounts.spotify.com/authorize/?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}&show_dialog=false`)
      .then(tokenResponse => {
        console.log(tokenResponse.data.access_token);
        setToken(tokenResponse.data.access_token);

        axios.post(`https://accounts.spotify.com/api/token`, {
          headers: {
            'Content-Type:' : 'application/x-www.form-urlencoded',
            'Authorization' : 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
          },
          data: 'grant_type=authorization_code',
        })
    })
  }
  return (
    <Card>
      <h3>Sign In To Spotify</h3>
      <a href={`https://accounts.spotify.com/authorize/?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}&show_dialog=false`}>Login to Spotify</a>
    </Card>
  )
}

export default Login
