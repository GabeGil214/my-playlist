/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "@app/components/header/Header"
import "./layout.css"
import { PlaylistProvider } from '@contexts/playlistContext'

const Layout = ({ children }) => {

  return (
    <>
      <PlaylistProvider>
        <Header siteTitle='My Custom Playlist' />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >

          <main>{children}</main>
          <footer>
            <p>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.com">Gatsby</a>
            </p>
          </footer>
        </div>
      </PlaylistProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
