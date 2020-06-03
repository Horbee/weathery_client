import React from "react";

import { useWeatherService } from "./useWeatherService";

export const WeatherServiceContext = React.createContext<
  ReturnType<typeof useWeatherService>
>(undefined as any);
