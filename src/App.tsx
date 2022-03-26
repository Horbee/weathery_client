import './assets/styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import './form-config/custom-fluent-fields/config'

import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AppRoutes } from './constants/routes'
import { LoadingWrapper } from './custom-components/LoadingWrapper'
import { BackendIndicator } from './pages/common/backend-indicator/BackendIndicator'
import { HomePage } from './pages/home/HomePage'
import { ResetPassword } from './pages/resetpassword-modal/ResetPassword'
import { StartPage } from './pages/start/StartPage'
import { AuthServiceContext } from './service/auth/AuthServiceContext'
import { useAuthService } from './service/auth/useAuthService'
import { useWeatherService } from './service/weather/useWeatherService'
import { WeatherServiceContext } from './service/weather/WeatherServiceContext'

export const App = () => {
  const authService = useAuthService();
  const weatherService = useWeatherService();

  return (
    <>
      <LoadingWrapper loading={authService.checkInitialAuthState}>
        <AuthServiceContext.Provider value={authService}>
          <WeatherServiceContext.Provider value={weatherService}>
            <BackendIndicator />
            <Routes>
              <Route
                path={AppRoutes.Home}
                element={
                  authService.auth.isLoggedIn ? (
                    <HomePage />
                  ) : (
                    <Navigate to={AppRoutes.Start} />
                  )
                }
              />
              <Route
                path={AppRoutes.Start}
                element={
                  !authService.auth.isLoggedIn ? (
                    <StartPage />
                  ) : (
                    <Navigate to={AppRoutes.Home} />
                  )
                }
              />

              <Route
                path={AppRoutes.ResetPassword}
                element={<ResetPassword />}
              />
            </Routes>
          </WeatherServiceContext.Provider>
        </AuthServiceContext.Provider>
      </LoadingWrapper>
      <ToastContainer />
    </>
  );
};
