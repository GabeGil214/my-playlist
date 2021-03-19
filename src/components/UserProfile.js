import React, { useState, useEffect } from "react";
import axios from 'axios';


function UserProfile(props){
  const [userData, setUserData] = useState({})

  return (
    <div>
      <h2>Signed In As {userData.display_name}</h2>
    </div>
  )
}

export default UserProfile
