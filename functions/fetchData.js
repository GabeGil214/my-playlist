const axios = require("axios");
const qs = require("qs");

exports.handler = async function (event, context) {
  //Securely access environment variables here
  try {

    const apiString = process.env.GATSBY_CLIENT_ID + ':' + process.env.CLIENT_SECRET

    const apiEncoded = Buffer.from(apiString).toString('base64')

    const { code } = event.queryStringParameters
    const data = {
       grant_type: 'authorization_code',
       code: code,
       redirect_uri: 'http://mycustomplaylist.com/playlist'
    }

    const response = await axios.post(`https://accounts.spotify.com/api/token`, qs.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + apiEncoded
          }
        })

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    }
  } catch (error) {
    return {statusCode: 500, body: error}
  }




};
