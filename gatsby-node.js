/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const cityData = [
    {
        city: "Berlin",
        artists: [
         "Daft Punk",
         "Ross From Friends",
         "Mallgrab",
         "Flume",
         "Rufus Du Sol",
         "Lane 8",
         "Tame Impala",
         "Arctic Monkeys",
         "Jaime XX"
       ],
       genres: [
         "House",
         "Techno",
         "Alternative Rock",
         "Electronic"
       ],
       characteristics: [
         "dance",
         "upbeat",
         "high tempo",
         "experimental"
       ]
     },
     {
       city: "Los Angeles",
       artists: [
        "Kygo",
        "Tycho",
        "Katy Perry",
        "Maluma",
        "Rufus Du Sol",
        "The XX",
        "Tame Impala",
        "Mumford and Sons",
        "Bad Bunny"
      ],
      genres: [
        "Pop",
        "Dance",
        "Alternative Rock",
        "Latin"
      ],
      characteristics: [
        "dance",
        "happy",
        "vocal heavy",
        "popular"
      ]
    }
  ]

  cityData.forEach(city => {
    const node = {
      name: city.city,
      artist: city.artists,
      id: createNodeId(`City-${city.city}`),
      internal: {
        type: "City",
        contentDigest: createContentDigest(city),
      },
    }
    actions.createNode(node)
  })
}
