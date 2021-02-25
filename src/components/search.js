import React, { useState, Fragment } from "react"
import { navigate } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStaticQuery, graphql } from "gatsby"


import Button from "react-bootstrap/Button"

function Search() {
  const [alertMessage, setAlertMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  let allCities = []


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

  cityData.allCity.edges.map(function(city){
    allCities.push(city.node.name)
  })

  console.log(cityData)
  console.log(allCities)

  const isValidCity = function(searchQuery){
    //check if search term matches a city in database
    const index = allCities.indexOf(searchQuery.toLowerCase());
    if(index === -1){
      setAlertMessage("Sorry, we don't have any information on that city")
    } else {
      navigate('/results', {
        state: allCities[index]
      })
    }

  }

return (
  <Fragment>
    <div
      className="search-container"
      >
      <form onSubmit={isValidCity}>
        <input className="form-control search-input" type="text" value={searchQuery} onChange={setSearchQuery} placeholder="City Name"/>
        <Button variant="success" type="submit">Search</Button>
      </form>
    </div>
    <div className="alert">
      <a href="#"><span className="close">X</span></a>
      <p>{alertMessage}</p>
    </div>
  </Fragment>
)

}

export default Search
