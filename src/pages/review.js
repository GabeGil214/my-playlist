import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Layout from "../components/layout"
import PlaylistPreview from "../components/PlaylistPreview"
import SEO from "../components/seo"

const ReviewPage = ({location}) => (

  <Layout>
  <SEO title="Playlist Overview" />
    <Container>
      <Row className="justify-content-md-center" xs={12}>
        <Col xs={8}>
          <PlaylistPreview playlistState={location.state.playlistState}/>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default ReviewPage
