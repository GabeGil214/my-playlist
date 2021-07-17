import React from "react"
import { Router } from "@reach/router"
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Layout from "../components/layout"
import PlaylistContainer from "../components/PlaylistContainer"
import SEO from "../components/seo"

const PlaylistPage = () => (

  <Layout>
    <SEO title="Playlist Generator" />
    <Container>
      <Row className="justify-content-sm-center">
        <Router>
          <PlaylistContainer path="/:code"/>
        </Router>
      </Row>
    </Container>
  </Layout>
)

export default PlaylistPage
