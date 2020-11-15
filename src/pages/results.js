import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Badge from "react-bootstrap/Badge"
import Card from "react-bootstrap/Card"
import Layout from "../components/layout"
import SEO from "../components/seo"


function ResultsPage(cityName) {
  const { results } = useStaticQuery(graphql`
    query MyQuery {
    city(name: {eq: ${cityName}}) {
      artist
      characteristics
      genres
    }`
  }

  return (
    <Layout>
    <SEO title="Results" />
      <Container>
        <Row className="justify-content-md-center" xs={12}>
          <Col xs={8}>
            <Card>
              <Card.Body>
                <Card.Title>{results.city}</Card.Title>
                <p>
                  {results.characteristics.map(characteristic => (
                    <Badge variant="primary">{characteristic}</Badge>
                  ))}
                </p>
                <Col xs={6}>
                  <h2>Top Artists</h2>
                  <ul>
                    {results.artists.map(artist => (
                      <li>{artist}</li>
                    ))}
                  </ul>
                </Col>
                <Col xs={6}>
                  <h2>Top Genres</h2>
                  <ul>
                    {results.genres.map(genres => (
                      <li>{genres}</li>
                    ))}
                  </ul>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )

}
export default ResultsPage
