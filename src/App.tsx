import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { toast } from "react-toastify";

import { BackendIndicator } from "./pages/common/backend-indicator/BackendIndicator";
import { Login } from "./pages/login/Login";
import { AuthServiceContext } from "./service/AuthServiceContext";
import { useAuthService } from "./service/useAuthService";
import { useWeatherService } from "./service/useWeatherService";
import { WeatherServiceContext } from "./service/WeatherServiceContext";

export const App = () => {
  const authService = useAuthService();
  const weatherService = useWeatherService();

  toast.configure();
  return (
    <AuthServiceContext.Provider value={authService}>
      <WeatherServiceContext.Provider value={weatherService}>
        <BackendIndicator />
        <Login />
      </WeatherServiceContext.Provider>
    </AuthServiceContext.Provider>
  );
};
