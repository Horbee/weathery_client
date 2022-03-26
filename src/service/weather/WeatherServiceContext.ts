import { createContext } from 'react'

import { useWeatherService } from './useWeatherService'

export const WeatherServiceContext = createContext<
  ReturnType<typeof useWeatherService>
>(undefined as any);
