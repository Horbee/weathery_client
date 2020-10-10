import "./assets/styles/main.css";
import "react-toastify/dist/ReactToastify.css";
import "./form-config/custom-fluent-fields/config";

import React from "react";
import { Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";

import { Routes } from "./constants/routes";
import { ConditionalRoute } from "./custom-components/ConditionalRoute";
import { LoadingWrapper } from "./custom-components/LoadingWrapper";
import { BackendIndicator } from "./pages/common/backend-indicator/BackendIndicator";
import { HomePage } from "./pages/home/HomePage";
import { ResetPassword } from "./pages/resetpassword-modal/ResetPassword";
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
              condition={!authService.auth.isLoggedIn}
              component={StartPage}
              redirectUrl={Routes.Home}
            />
          </Switch>
          <Route exact path={Routes.ResetPassword} component={ResetPassword} />
        </WeatherServiceContext.Provider>
      </AuthServiceContext.Provider>
    </LoadingWrapper>
  );
};
