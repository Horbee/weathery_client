export const openWeatherMapIconURL = (icon: string) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const backendURL = (url: string) => apiBaseUrl + url;

export const apiBaseUrl =
  import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api/v1";
