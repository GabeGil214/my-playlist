import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStaticQuery, graphql } from "gatsby"


import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Badge from "react-bootstrap/Badge"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Layout from "../components/layout"
import SEO from "../components/seo"


function ResultsPage(cityName) {
  const results = useStaticQuery(graphql`
    query MyQuery {
      city(name: {eq: "Berlin"}) {
        artists
        characteristics
        genres
        name
      }
    }`
  )

  console.log(results)

  return (
    <Layout>
    <SEO title="Results" />
      <Container>
        <Row className="justify-content-md-center" xs={12}>
          <Col xs={8}>
            <Card>
              <Card.Body>
                <Card.Title>{results.city.name}</Card.Title>
                <p>
                  {results.city.characteristics.map(characteristic => (
                    <Badge variant="primary">{characteristic}</Badge>
                  ))}
                </p>
                <Row className="justify-content-md-center" xs={12}>
                  <Col xs={6}>
                    <Card.Subtitle>Top Artists</Card.Subtitle>
                    <ListGroup>
                      {results.city.artists.map(artist => (
                        <ListGroupItem>{artist}</ListGroupItem>
                      ))}
                    </ListGroup>
                  </Col>
                  <Col xs={6}>
                    <Card.Subtitle>Top Genres</Card.Subtitle>
                    <ListGroup>
                      {results.city.genres.map(genre => (
                        <ListGroupItem>{genre}</ListGroupItem>
                      ))}
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )

}
export default ResultsPage
