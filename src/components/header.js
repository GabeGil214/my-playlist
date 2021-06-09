import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Row from "react-bootstrap/Row"



const Header = ({ siteTitle }) => (
  <header
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <Row className="justify-content-md-center header" xs={12}>
      <h1>{siteTitle}</h1>
    </Row>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
