const axios = require("axios");
const { API_WEATHER_URL } = process.env;

const getWether = async () => {
  const response = await axios.get(API_WEATHER_URL);
  let responseText = `Город: ${response.data.location.name}\nДата: ${response.data.location.localtime}\nТемпература: ${response.data.current.temp_c}\nОблачность: ${response.data.current.cloud}`;
  return responseText;
};

module.exports = getWether;
