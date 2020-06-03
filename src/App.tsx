import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { toast } from "react-toastify";

import { Routes } from "./constants/routes";
import { ConditionalRoute } from "./custom-components/ConditionalRoute";
import { LoadingWrapper } from "./custom-components/LoadingWrapper";
import { BackendIndicator } from "./pages/common/backend-indicator/BackendIndicator";
import { HomePage } from "./pages/home/HomePage";
import { StartPage } from "./pages/start/StartPage";
import { AuthServiceContext } from "./service/auth/AuthServiceContext";
import { useAuthService } from "./service/auth/useAuthService";
import { useWeatherService } from "./service/weather/useWeatherService";
import { WeatherServiceContext } from "./service/weather/WeatherServiceContext";

export const App = () => {
  const authService = useAuthService();
  const weatherService = useWeatherService();

  toast.configure();
  return (
    <LoadingWrapper loading={authService.checkInitialAuthState}>
      <AuthServiceContext.Provider value={authService}>
        <WeatherServiceContext.Provider value={weatherService}>
          <BrowserRouter>
            <BackendIndicator />
            <Switch>
              <ConditionalRoute
                path={Routes.Home}
                exact
                condition={authService.auth.isLoggedIn}
                component={HomePage}
                redirectUrl={Routes.Start}
              />
              <ConditionalRoute
                path={Routes.Start}
                exact
                condition={!authService.auth.isLoggedIn}
                component={StartPage}
                redirectUrl={Routes.Home}
              />
            </Switch>
          </BrowserRouter>
        </WeatherServiceContext.Provider>
      </AuthServiceContext.Provider>
    </LoadingWrapper>
  );
};
