import { City } from "./CitySearchResponse";

export interface AccessTokenProps {
  appId: string;
  exp: number;
  iat: number;
  user: {
    id: string;
    name: string;
    city?: City;
  };
}
