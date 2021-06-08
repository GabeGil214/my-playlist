import React from "react";

function UserProfile(props){

  return (
    <div>
      <h2>Signed In As {props.userData.display_name}</h2>
    </div>
  )
}

export default UserProfile
