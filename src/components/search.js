import React from "react"
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css'

import Button from "react-bootstrap/Button"
import { results } from '../data/test'

function Search() {


  <div
    style={{
      margin: `0 auto`,
      maxWidth: 960,
      padding: `1.45rem 1.0875rem`,
    }}
  >
    <input className="form-control search-input" type="text" placeholder="City Name"/>
    <Link to="/results" state={{results}} ><Button variant="success">Search</Button></Link>
  </div>

}
export default Search
