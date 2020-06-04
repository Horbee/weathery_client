export const openWeatherMapIconURL = (icon: string) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const backendURL = (url: string) =>
  process.env.REACT_APP_API_URL || "http://localhost:5000" + url;
