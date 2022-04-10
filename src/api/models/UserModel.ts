import { City } from "./CitySearchResponse";

export interface UserModel {
  _id: string;
  name: string;
  email: string;
  loginMethod: string;
  googleId?: string;
  facebookId?: string;
  city?: City;
  createdAt: string;
  updatedAt: string;
}
