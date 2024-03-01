const axios = require("axios");
const { API_CURRENCY_EXCHANGE } = process.env;

const getCurrency = async () => {
  const response = await axios.get(API_CURRENCY_EXCHANGE);

  return response.data.rates;
};

module.exports = getCurrency;
