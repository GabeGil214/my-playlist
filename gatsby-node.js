/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, 'src/'),
        '@images': path.resolve(__dirname, 'src/images/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@contexts': path.resolve(__dirname, 'src/contexts/'),
        '@sass': path.resolve(__dirname, 'src/styles/'),
      }
    },
  })
}
