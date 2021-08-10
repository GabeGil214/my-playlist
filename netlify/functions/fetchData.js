const axios = require("axios");
const qs = require("qs");
const btoa = require("btoa");

exports.handler = async function (event, context) {
  //Securely access environment variables here
  let response;
  try {
    const { code } = event.queryStringParameters;
    const data = {
       grant_type: 'authorization_code',
       code: code,
       redirect_uri: 'http://mycustomplaylist.com/playlist'
    }

    response = await axios.post(`https://accounts.spotify.com/api/token`, qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(process.env.GATSBY_CLIENT_ID + ':' + process.env.CLIENT_SECRET)
        }
      }
    ).then((res) => res.json())
  } catch(error) {
      return {
        statusCode: 404,
        body: error.toString()
      }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
};
