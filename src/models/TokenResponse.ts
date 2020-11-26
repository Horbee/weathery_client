import { ReactFacebookLoginInfo } from "react-facebook-login";

import { City } from "./CitySearchResponse";

export interface FacebookLoginResponse extends ReactFacebookLoginInfo {
  data_access_expiration_time: number;
  expiresIn: number;
  graphDomain: string;
  signedRequest: string;
  userID: string;
}

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

export interface GoogleTokenProps {
  aud: string;
  sub: string;
  email: string;
  name: string;
  picture: string;
}
