import axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";

import { backendURL } from "../../constants/endpoints";
import {
  AccessTokenProps,
  FacebookLoginResponse
} from "../../models/TokenResponse";
import { Nullable } from "../../utils/Nullable";
import { createErrorToast } from "../../utils/toast/errorToast";
import { createSuccessToast } from "../../utils/toast/successToast";
import { TypedStorage } from "../../utils/typedStorage";

interface UserData {
  accessToken: string;
  isLoggedIn: boolean;
  city: Nullable<string>;
}

interface AuthResponse {
  success: boolean;
  data: string;
}

const initialAuthState = {
  accessToken: "",
  isLoggedIn: false,
  city: null
};

export const useAuthService = () => {
  const [loading, setLoading] = useState(false);
  const [checkInitialAuthState, setCheckInitialAuthState] = useState(true);
  const [auth, setAuth] = useState<UserData>(initialAuthState);

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await axios.post<AuthResponse>(
        backendURL("/api/auth/login"),
        {
          email,
          password
        }
      );
      const token = response.data.data;
      const decoded = jwt.decode(token) as AccessTokenProps;
      setAuth({
        isLoggedIn: true,
        accessToken: token,
        city: decoded.user.city ?? null
      });
      TypedStorage.username = email;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = moment(decoded.exp * 1000);
    } catch (err) {
      console.log({ err });
      if (err.response?.data?.success === false) {
        createErrorToast(err.response.data.error);
      }
    }

    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      const response = await axios.post<AuthResponse>(backendURL("/api/auth"), {
        email,
        password,
        name
      });
      const token = response.data.data;
      setAuth({ isLoggedIn: true, accessToken: token, city: null });
      const decoded = jwt.decode(token) as AccessTokenProps;
      TypedStorage.username = email;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = moment(decoded.exp * 1000);
    } catch (err) {
      console.log({ err });
      if (err.response?.data?.success === false) {
        createErrorToast(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const checkLocalStorage = () => {
    setCheckInitialAuthState(true);

    const accessToken = TypedStorage.accessToken;
    const tokenExpirationDate = TypedStorage.tokenExpirationDate;

    if (accessToken) {
      if (tokenExpirationDate && tokenExpirationDate > moment()) {
        const decoded = jwt.decode(accessToken) as AccessTokenProps;

        setAuth({
          isLoggedIn: true,
          accessToken,
          city: decoded?.user?.city ?? null
        });
        console.log("You are logged in");
      } else {
        console.log("Token expired");
      }
    } else {
      console.log("No token found");
    }

    setCheckInitialAuthState(false);
  };

  const clearAuth = () => {
    setAuth(initialAuthState);
    TypedStorage.clearAuth();
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);

    try {
      const response = await axios.post(
        backendURL("/api/auth/forgotpassword"),
        { email }
      );
      createSuccessToast(response.data.data);
    } catch (err) {
      console.log({ err });
      if (err.response?.data?.success === false) {
        createErrorToast(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (password: string, token: string) => {
    setLoading(true);

    try {
      const response = await axios.post(
        backendURL(`/api/auth/resetpassword?token=${token}`),
        {
          password
        }
      );
      createSuccessToast(response.data.data);
      return true;
    } catch (err) {
      console.log({ err });
      if (err.response?.data?.success === false) {
        createErrorToast(err.response.data.error);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);

    const idToken = (response as GoogleLoginResponse).tokenObj.id_token;
    //const accessToken = (response as GoogleLoginResponse).tokenObj.access_token;
    const expiresAt = (response as GoogleLoginResponse).tokenObj.expires_at;
    const email = (response as GoogleLoginResponse).profileObj.email;
    const name = (response as GoogleLoginResponse).profileObj.name;
    //const googleId = (response as GoogleLoginResponse).profileObj.googleId;

    try {
      const response = await axios.post<AuthResponse>(
        backendURL("/api/oauth/google"),
        {
          email,
          name,
          idToken
        }
      );
      const token = response.data.data;
      const decoded = jwt.decode(token) as AccessTokenProps;
      setAuth({
        isLoggedIn: true,
        accessToken: token,
        city: decoded.user.city ?? null
      });
      TypedStorage.username = email;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = moment(decoded.exp * 1000);
    } catch (err) {
      console.log({ err });
      if (err.response?.data?.success === false) {
        createErrorToast(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const facebookLogin = async (response: FacebookLoginResponse) => {
    setLoading(true);

    console.log(response);
    const {
      accessToken,
      /*id: facebookId,*/ email,
      name,
      expiresIn
    } = response;

    try {
      const response = await axios.post<AuthResponse>(
        backendURL("/api/oauth/facebook"),
        {
          email,
          name,
          accessToken
        }
      );
      const token = response.data.data;
      const decoded = jwt.decode(token) as AccessTokenProps;
      setAuth({
        isLoggedIn: true,
        accessToken: token,
        city: decoded.user.city ?? null
      });
      TypedStorage.username = email!;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = moment(decoded.exp * 1000);
    } catch (err) {
      console.log({ err });
      if (err.response?.data?.success === false) {
        createErrorToast(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    auth,
    login,
    googleLogin,
    facebookLogin,
    clearAuth,
    signup,
    forgotPassword,
    resetPassword,
    checkInitialAuthState,
    loading
  };
};
