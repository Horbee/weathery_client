import React, { useContext, useEffect } from "react";

import { faRedo, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import gradientImg from "../../assets/images/gradient.jpg";
import { AuthServiceContext } from "../../service/auth/AuthServiceContext";
import { WeatherServiceContext } from "../../service/weather/WeatherServiceContext";
import { TypedStorage } from "../../utils/typedStorage";
import { RoundedButton } from "../common/rounded-button/RoundedButton";
import { CitySearch } from "./CitySearch";
import { WeatherGrid } from "./WeatherGrid";

export const HomePage = () => {
  const { clearAuth } = useContext(AuthServiceContext);
  const {
    getCities,
    getCityForecast,
    clearWeatherInfo,
    timedRefreshLastCitySearch,
    weatherForecast,
    lastCity,
    lastSearchTime
  } = useContext(WeatherServiceContext);

  const refreshCitySearch = () => timedRefreshLastCitySearch();

  const logout = () => {
    clearWeatherInfo();
    clearAuth();
  };

  useEffect(() => {
    const lastCity = TypedStorage.citySearch;
    if (lastCity) {
      getCityForecast(lastCity);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="container mx-auto">
      <div className="my-4 flex items-center justify-between">
        <div>
          <RoundedButton
            tooltipText={"Refresh"}
            tooltipClassName="ml-4"
            disabled={!lastSearchTime}
            onClick={refreshCitySearch}
            icon={faRedo}
          />
        </div>
        <div className="w-full md:w-1/2">
          <CitySearch citySearch={getCities} cityForecast={getCityForecast} />
        </div>
        <div>
          <RoundedButton
            tooltipText={"Logout"}
            tooltipClassName="-ml-24"
            onClick={logout}
            icon={faSignOutAlt}
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
