import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Layout from "../components/layout"
import PlaylistGenerator from "../components/PlaylistGenerator"
import SEO from "../components/seo"

const PlaylistPage = () => (

  <Layout>
  <SEO title="Playlist Generator" />
    <Container>
      <Row className="justify-content-md-center" xs={12}>
        <Col xs={8}>
          <PlaylistGenerator />
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default PlaylistPage