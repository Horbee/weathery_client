import "./WeatherGrid.scss";

import { motion } from "framer-motion";
import moment from "moment";
import React, { useMemo } from "react";

import { faCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { openWeatherMapIconURL } from "../../constants/endpoints";
import { Weather } from "../../models/WeatherResponse";
import { decimal } from "../../utils/math";
import { capitalize } from "../../utils/string";
import { FlipCard, xFlipVariatons, yFlipVariatons } from "./grid-components/FlipCard";
import { SingleValueCard } from "./grid-components/SingleValueCard";

interface WeatherGridProps {
  weather: Weather;
}

export const WeatherGrid: React.FC<WeatherGridProps> = ({ weather }) => {
  const maxTempMemo = useMemo(() => decimal(weather.main.temp_max), [
    weather.main.temp_max
  ]);

  const minTempMemo = useMemo(() => decimal(weather.main.temp_min), [
    weather.main.temp_min
  ]);

  const tempMemo = useMemo(() => decimal(weather.main.temp), [
    weather.main.temp
  ]);
  const feelsLikeMemo = useMemo(() => decimal(weather.main.feels_like), [
    weather.main.feels_like
  ]);

  return (
    <div className="grid-container">
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
          {weather.wind.speed} <span>m/s</span>
        </h2>
        <p>Wind</p>
      </SingleValueCard>
      <div className="bg2 hoverable">
        <h2>
          <FontAwesomeIcon icon={faCity} />
        </h2>
        <p>{weather.name}</p>
      </div>
      {weather.weather.map((values) => (
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
            <h2>{moment(weather.sys.sunrise * 1000).format("HH:mm")}</h2>
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
            <h2>{moment(weather.sys.sunset * 1000).format("HH:mm")}</h2>
            <p>Sunset</p>
          </motion.div>
        }
      />
      <SingleValueCard className="bg1">
        <h2>
          {weather.main.pressure} <span>hPa</span>
        </h2>
        <p>Pressure</p>
      </SingleValueCard>
      <SingleValueCard className="bg2">
        <h2>
          {weather.main.humidity} <span>%</span>
        </h2>
        <p>Humidity</p>
      </SingleValueCard>
      <SingleValueCard className="bg2">
        <h2>
          {weather.clouds.all} <span>%</span>
        </h2>
        <p>Cloudiness</p>
      </SingleValueCard>
    </div>
  );
};
