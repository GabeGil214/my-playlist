import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Layout from "@components/gatsbyComponents/layout/Layout"
import PlaylistPreview from "@components/playlistComponents/playlistPreview/PlaylistPreview"
import SEO from "@components/gatsbyComponents/seo/Seo"

const ReviewPage = () => (

  <Layout>
      <SEO title="Playlist Overview" />
      <Container>
        <Row className="justify-content-md-center" xs={12}>
          <Col xs={8}>
            <PlaylistPreview />
          </Col>
        </Row>
      </Container>
  </Layout>
)

export default ReviewPage
