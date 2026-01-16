import OpenWeatherMap from "openweathermap-ts";

// OpenWeatherMap API client
const openWeather = new OpenWeatherMap({
    apiKey: "a45685593ef2f60c20c3571b349f8b74",
});

// Set temperature unit to metric
openWeather.setUnits("metric");

export default openWeather;
