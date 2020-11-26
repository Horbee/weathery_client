import "./WeatherGrid.scss";

import { motion } from "framer-motion";
import moment from "moment";
import React, { useMemo } from "react";

import { faCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { openWeatherMapIconURL } from "../../constants/endpoints";
import { City } from "../../models/CitySearchResponse";
import { Forecast } from "../../models/ForecastResponse";
import { capitalize } from "../../utils/capitalize";
import { decimal } from "../../utils/math";
import { xFlipVariatons, yFlipVariatons } from "../common/variants/framerVariants";
import { FlipCard } from "./grid-components/FlipCard";
import { SingleValueCard } from "./grid-components/SingleValueCard";

interface WeatherGridProps {
  // weather: Weather;
  weather: Forecast;
  lastCity: City;
}

export const WeatherGrid: React.FC<WeatherGridProps> = ({
  weather,
  lastCity
}) => {
  const maxTempMemo = useMemo(
    () => decimal(weather.daily[0]?.temp.max) || 0, //TODO
    [weather.daily]
  );

  const minTempMemo = useMemo(() => decimal(weather.daily[0]?.temp.min || 0), [
    weather.daily
  ]);

  const tempMemo = useMemo(() => decimal(weather.current.temp), [weather]);

  const feelsLikeMemo = useMemo(() => decimal(weather.current.feels_like), [
    weather
  ]);

  return (
    <div className="grid-container grid-cols-2 xl:grid-cols-4">
      <FlipCard
        frontSide={
          <motion.div
            className="bg2"
            variants={xFlipVariatons}
            initial="initial"
            animate="enter"
            whileHover="hover"
            transition={{ rotateX: { duration: 0.5 } }}
            key="front"
          >
            <h2>{tempMemo} &deg;</h2>
            <p>Temperature</p>
          </motion.div>
        }
        backSide={
          <motion.div
            className="bg2"
            variants={xFlipVariatons}
            initial="initial"
            animate="enter"
            whileHover="hover"
            transition={{ rotateX: { duration: 0.5 } }}
            key="back"
          >
            <h2>{feelsLikeMemo} &deg;</h2>
            <p>Feels Like</p>
          </motion.div>
        }
      />
      <SingleValueCard className="bg1">
        <h2>{maxTempMemo} &deg;</h2>
        <p>Max</p>
      </SingleValueCard>
      <SingleValueCard className="bg1">
        <h2>{minTempMemo} &deg;</h2>
        <p>Min</p>
      </SingleValueCard>
      <SingleValueCard className="bg2">
        <h2>
          {weather.current.wind_speed} <span>m/s</span>
        </h2>
        <p>Wind</p>
      </SingleValueCard>
      <div className="bg2 hoverable">
        <h2>
          <FontAwesomeIcon icon={faCity} />
        </h2>
        <p>{lastCity.name}</p>
      </div>
      {weather.current.weather.map((values) => (
        <SingleValueCard className="bg1" key={values.id}>
          <img src={openWeatherMapIconURL(values.icon)} alt={values.main} />
          <p>{capitalize(values.description)}</p>
        </SingleValueCard>
      ))}
      <FlipCard
        frontSide={
          <motion.div
            className="bg1"
            variants={yFlipVariatons}
            initial="initial"
            animate="enter"
            whileHover="hover"
            transition={{ rotateX: { duration: 0.5 } }}
            key="front"
          >
            <h2>{moment(weather.current.sunrise * 1000).format("HH:mm")}</h2>
            <p>Sunrise</p>
          </motion.div>
        }
        backSide={
          <motion.div
            className="bg1"
            variants={yFlipVariatons}
            initial="initial"
            animate="enter"
            whileHover="hover"
            transition={{ rotateX: { duration: 0.5 } }}
            key="back"
          >
            <h2>{moment(weather.current.sunset * 1000).format("HH:mm")}</h2>
            <p>Sunset</p>
          </motion.div>
        }
      />
      <SingleValueCard className="bg1">
        <h2>
          {weather.current.pressure} <span>hPa</span>
        </h2>
        <p>Pressure</p>
      </SingleValueCard>
      <SingleValueCard className="bg2">
        <h2>
          {weather.current.humidity} <span>%</span>
        </h2>
        <p>Humidity</p>
      </SingleValueCard>
      <SingleValueCard className="bg2">
        <h2>
          {weather.current.clouds} <span>%</span>
        </h2>
        <p>Cloudiness</p>
      </SingleValueCard>
    </div>
  );
};
