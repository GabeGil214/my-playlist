import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Layout from "../components/layout"
import Login from "../components/Login"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
  <SEO title="Home" />
    <Container>
      <Row className="justify-content-md-center" xs={12}>
        <Col xs={8}>
          <h3 className="search-header">Create your Perfect Spotify Playlist</h3>
          <Login />
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
