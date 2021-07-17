const axios = require("axios");

exports.handler = async function (event, context) {
  //Securely access environment variables here
  try {
    const { data } = event.queryStringParameters;
    const response = await axios.post(`https://accounts.spotify.com/api/token`, qs.stringify(data),
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(process.env.GATSBY_CLIENT_ID + ':' + process.env.CLIENT_SECRET)
        }
      })
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    statusCode: 404,,
    body: error.toString()
  }
};
