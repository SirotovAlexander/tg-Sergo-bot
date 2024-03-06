const axios = require("axios");
const { API_JOKE } = process.env;

const getJoke = async () => {
  const response = await axios.get(API_JOKE);

  return response.data;
};

module.exports = getJoke;
