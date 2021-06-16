import PropTypes from "prop-types"
import React from "react"
import UserProfile from './UserProfile';

import Row from "react-bootstrap/Row"

function Header({ siteTitle }){


  return(
    <header
      style={{
        marginBottom: `1.45rem`,
      }}
      >
      <Row className="justify-content-md-center header" xs={12}>
        <UserProfile />
        <h1>{siteTitle}</h1>
      </Row>
    </header>
  )

}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
