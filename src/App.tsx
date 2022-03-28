import "./assets/styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "./form-config/custom-fluent-fields/config";


import { IconContext } from "react-icons";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import { AppRoutes } from "./constants/routes";
import { AuthenticatedRoute } from "./custom-components/AuthenticatedRoute";
import { LoadingWrapper } from "./custom-components/LoadingWrapper";
import { BackendIndicator } from "./pages/common/backend-indicator/BackendIndicator";
import { HomePage } from "./pages/home/HomePage";
import { ResetPassword } from "./pages/resetpassword-modal/ResetPassword";
import { StartPage } from "./pages/start/StartPage";
import { AuthServiceContext } from "./service/auth/AuthServiceContext";
import { useAuthService } from "./service/auth/useAuthService";
import { WeatherServiceProvider } from "./service/weather/WeatherServiceContext";

export const App = () => {
  const authService = useAuthService();

  return (
    <>
      <LoadingWrapper loading={authService.checkInitialAuthState}>
        <IconContext.Provider value={{ className: "inline-block" }}>
          <AuthServiceContext.Provider value={authService}>
            <WeatherServiceProvider>
              <BackendIndicator />
              <Routes>
                <Route
                  path={AppRoutes.Home}
                  element={
                    <AuthenticatedRoute fallbackUrl={AppRoutes.Start}>
                      <HomePage />
                    </AuthenticatedRoute>
                  }
                />
                <Route
                  path={AppRoutes.Start}
                  element={
                    <AuthenticatedRoute fallbackUrl={AppRoutes.Home} negate>
                      <StartPage />
                    </AuthenticatedRoute>
                  }
                />

                <Route
                  path={AppRoutes.ResetPassword}
                  element={<ResetPassword />}
                />
              </Routes>
            </WeatherServiceProvider>
          </AuthServiceContext.Provider>
        </IconContext.Provider>
      </LoadingWrapper>
      <ToastContainer />
    </>
  );
};
