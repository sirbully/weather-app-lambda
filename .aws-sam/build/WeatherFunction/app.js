const axios = require('axios');
const API_URL = 'https://www.metaweather.com/api/location';

exports.handler = async (event) => {
  const params = event.queryStringParameters;
  let result;

  try {
    if ('lattlong' in params) {
      result = await axios.get(`${API_URL}/search?lattlong=${params.lattlong}`);
    } else if ('query' in params) {
      result = await axios.get(`${API_URL}/search?query=${params.query}`);
    } else if ('id' in params) {
      result = await axios.get(`${API_URL}/${params.id}`);
    }
    console.log(result.data);
  } catch (err) {
    console.log(err.data);
  }

  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
    'Content-Type': 'application/json',
  };
  return {
    statusCode: result.status,
    headers: headers,
    body: JSON.stringify(result.data),
  };
};
