const axios = require("axios");
const qs = require("qs");

exports.handler = async function (event, context) {
  // apply our function to the queryStringParameters and assign it to a variable
  const API_PARAMS = qs.stringify(event.queryStringParameters.search);
  console.log(event);
  // const API_PARAMS = qs.stringify(event.queryStringParameters);
  console.log("API_PARAMS", API_PARAMS);
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { KEY } = process.env;
  const URL = `https://api.unsplash.com/search/photos?page=1&per_page=50&client_id=${KEY}&query=${API_PARAMS}`;

  console.log("Constructed URL is ...", URL);

  try {
    const { data } = await axios.get(URL);
    // refer to axios docs for other methods if you need them
    // for example if you want to POST data:
    //    axios.post('/user', { firstName: 'Fred' })
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};
