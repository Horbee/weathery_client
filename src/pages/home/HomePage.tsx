import { useEffect } from "react";
import { FaRedo, FaSignOutAlt } from "react-icons/fa";


import gradientImg from "../../assets/images/gradient.jpg";
import { useAuthService } from "../../service/auth/useAuthService";
import { useWeatherService } from "../../service/weather/useWeatherService";
import { TypedStorage } from "../../utils/typedStorage";
import { RoundedButton } from "../common/rounded-button/RoundedButton";
import { CitySearch } from "./CitySearch";
import { WeatherGrid } from "./WeatherGrid";

export const HomePage = () => {
  const { clearAuth, auth } = useAuthService();
  const { getCityForecast, clearWeatherInfo, weatherForecast, lastCity } =
    useWeatherService();

  const logout = () => {
    clearWeatherInfo();
    clearAuth();
  };

  useEffect(() => {
    const fetchInitialCityForecast = () => {
      const lastCity = auth.city || TypedStorage.citySearch;
      if (lastCity) getCityForecast(lastCity);
    };

    fetchInitialCityForecast();
  }, []);

  return (
    <section className="container mx-auto">
      <div className="my-4 flex items-center justify-between">
        <div>
          <RoundedButton
            tooltipText={"Refresh"}
            tooltipClassName="ml-4"
            onClick={() => getCityForecast(lastCity)}
            icon={<FaRedo />}
          />
        </div>
        <div className="w-full md:w-1/2">
          <CitySearch cityForecast={getCityForecast} />
        </div>
        <div>
          <RoundedButton
            tooltipText={"Logout"}
            tooltipClassName="-ml-24"
            onClick={logout}
            icon={<FaSignOutAlt />}
          />
        </div>
      </div>
      <div className="mt-4">
        {weatherForecast && lastCity ? (
          <WeatherGrid weather={weatherForecast} lastCity={lastCity} />
        ) : (
          <section
            style={{ backgroundImage: `url(${gradientImg})` }}
            className="bg-cover"
          >
            <div className="text-center text-white py-5 px-4">
              <h2 className="pt-3 mb-5 title text-white text-4xl">
                Hello, world!
              </h2>
              <p className="text-white mb-3">
                Start using Weathery by searching for a weather information of a
                city.
              </p>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};
