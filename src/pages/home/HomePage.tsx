import "./HomePage.scss";

import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { Container, Jumbotron, OverlayTrigger, Tooltip } from "react-bootstrap";

import { faRedo, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthServiceContext } from "../../service/auth/AuthServiceContext";
import { WeatherServiceContext } from "../../service/weather/WeatherServiceContext";
import { TypedStorage } from "../../utils/typedStorage";
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
    <Container>
      <div className="flex-center my-4">
        <OverlayTrigger
          placement={"bottom"}
          overlay={<Tooltip id="tooltip-refresh">Refresh</Tooltip>}
        >
          <motion.button
            className="rounded-button refresh-button"
            onClick={refreshCitySearch}
            disabled={!lastSearchTime}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={faRedo} />
          </motion.button>
        </OverlayTrigger>

        <div className="city-form">
          <CitySearch queryFunction={getWeatherInfo} />
        </div>

        <OverlayTrigger
          placement={"bottom"}
          overlay={<Tooltip id="tooltip-logout">Logout</Tooltip>}
        >
          <motion.button
            className="rounded-button logout-button"
            onClick={logout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </motion.button>
        </OverlayTrigger>
      </div>
      <div className="mt-4">
        {weather ? (
          <WeatherGrid weather={weather} />
        ) : (
          <Jumbotron className="gradient-bg">
            <div className="text-center text-white py-5 px-4">
              <h2 className="pt-3 mb-5 title text-white txt-big">
                Hello, world!
              </h2>
              <p className="subtitle text-white">
                Start using Weathery by searching for a weather information of a
                city.
              </p>
            </div>
          </Jumbotron>
        )}
      </div>
    </Container>
  );
};
