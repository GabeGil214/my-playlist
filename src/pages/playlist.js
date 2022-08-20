import React from "react"
import { Router } from "@reach/router"
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Layout from "@components/gatsbyComponents/layout/Layout"
import Playlist from "@components/PlaylistComponents/Playlist"
import SEO from "@components/gatsbyComponents/seo/Seo"

const PlaylistPage = () => (

  <Layout>
    <SEO title="Playlist Generator" />
    <Container>
      <Row className="justify-content-center">
        <Router>
          <Playlist path=":code"/>
        </Router>
      </Row>
    </Container>
  </Layout>
)

export default PlaylistPage
