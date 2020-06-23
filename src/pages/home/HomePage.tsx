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
  const { clearAuth, auth } = useContext(AuthServiceContext);
  const {
    getWeatherInfo,
    clearWeatherInfo,
    timedRefreshLastCitySearch,
    weather,
    lastSearchTime
  } = useContext(WeatherServiceContext);

  const refreshCitySearch = () => timedRefreshLastCitySearch();

  const logout = () => {
    clearWeatherInfo();
    clearAuth();
  };

  useEffect(() => {
    const lastCity = TypedStorage.citySearch || auth.city;

    if (lastCity) {
      getWeatherInfo(lastCity);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="container mx-auto">
      <div className="my-4 md:flex md:items-center md:justify-between">
        <div className="hidden md:block">
          <RoundedButton
            tooltipText={"Refresh"}
            tooltipClassName="ml-4"
            disabled={!lastSearchTime}
            onClick={refreshCitySearch}
            icon={faRedo}
          />
        </div>
        <div className="w-full mt-8 md:m-0 md:w-1/2">
          <CitySearch queryFunction={getWeatherInfo} />
        </div>

        <div className="flex justify-between mt-3">
          <div className="md:hidden">
            <RoundedButton
              tooltipText={"Refresh"}
              disabled={!lastSearchTime}
              onClick={refreshCitySearch}
              icon={faRedo}
            />
          </div>

          <RoundedButton
            tooltipText={"Logout"}
            tooltipClassName="-ml-24"
            onClick={logout}
            icon={faSignOutAlt}
          />
        </div>
      </div>
      <div className="mt-4">
        {weather ? (
          <WeatherGrid weather={weather} />
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
