export const openWeatherMapIconURL = (icon: string) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

export const backendURL = (url: string) => process.env.REACT_APP_API_URL + url;
