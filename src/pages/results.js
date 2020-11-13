import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Layout from "../components/layout"
import Search from "../components/search"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
  <SEO title="Home" />
    <Container>
      <Row className="justify-content-md-center" xs={12}>
        <Col xs={8}>
          <Card>
            <Card.Title>{city.name}</Card.Title>
          </Card>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
