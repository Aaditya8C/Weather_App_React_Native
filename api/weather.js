import axios from "axios";
const forecastEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=fb88b3aa22eb4c7fa65174023240604&q=${params.city}&days=${params.days}&aqi=yes`;
const locationsEndpoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=fb88b3aa22eb4c7fa65174023240604&q=${params.city}`;

const loadData = async (apiUrl) => {
  const options = {
    method: "GET",
    url: apiUrl,
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("Error while fething data:", error);
    return null;
  }
};

export const fetchWeatherData = (params) => {
  return loadData(forecastEndpoint(params));
};

export const fetchLocationsData = (params) => {
  return loadData(locationsEndpoint(params));
};
