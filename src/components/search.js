import React from "react"
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStaticQuery, graphql } from "gatsby"


import Button from "react-bootstrap/Button"

function Search() {
  const cityData = useStaticQuery(graphql`
      query {
        allCity {
          edges {
            node {
              name
            }
          }
        }
      }`
  )

  console.log(cityData)

  // isValidCity(searchQuery){
  //   //check if search term matches a city in database
  //
  //   if(cityData.includes(searchQuery ))
  // }

return (

  <div
    className="search-container"
    >
    <input className="form-control search-input" type="text" placeholder="City Name"/>
    <Link to="/results" ><Button variant="success">Search</Button></Link>
  </div>
)

}

export default Search
