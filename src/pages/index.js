import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Layout from "@components/gatsbyComponents/layout/Layout"
import Login from "@components/login/Login"
import SEO from "@components/gatsbyComponents/seo/Seo"

const IndexPage = () => (
  <Layout>
  <SEO title="Home" />
    <Container>
      <Row className="justify-content-md-center login-container" xs={12}>
        <Col xs={12} md={8}>
          <h3 className="login-header">Login To Spotify To Get Started</h3>
          <Login />
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
