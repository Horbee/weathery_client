import jwt from "jsonwebtoken";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";

import { CITYSEARCH } from "../../constants/localstorage";
import {
  AccessTokenProps,
  FacebookLoginResponse
} from "../../models/TokenResponse";
import { Nullable } from "../../utils/Nullable";
import { createSuccessToast } from "../../utils/toast/successToast";
import { TypedStorage } from "../../utils/typedStorage";
import { axiosInstance } from "../axios/axiosIstance";

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
      const response = await axiosInstance.post<AuthResponse>(
        "/api/auth/login",
        {
          email,
          password
        }
      );
      const token = response.data.data;
      const decoded = jwt.decode(token) as AccessTokenProps;
      TypedStorage.username = email;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = moment(decoded.exp * 1000);
      setAuth({
        isLoggedIn: true,
        accessToken: token,
        city: decoded.user.city ?? null
      });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post<AuthResponse>("/api/auth", {
        email,
        password,
        name
      });
      const token = response.data.data;
      const decoded = jwt.decode(token) as AccessTokenProps;
      TypedStorage.username = email;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = moment(decoded.exp * 1000);
      setAuth({ isLoggedIn: true, accessToken: token, city: null });
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
        TypedStorage.clearItem(CITYSEARCH);
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
      const response = await axiosInstance.post("/api/auth/forgotpassword", {
        email
      });
      createSuccessToast(response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    password: string,
    token: string
  ): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `/api/auth/resetpassword?token=${token}`,
        {
          password
        }
      );
      createSuccessToast(response.data.data);
      return true;
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (
    googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const idToken = (googleResponse as GoogleLoginResponse).tokenObj.id_token;
    const email = (googleResponse as GoogleLoginResponse).profileObj.email;
    const name = (googleResponse as GoogleLoginResponse).profileObj.name;

    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/api/oauth/google",
        {
          email,
          name,
          idToken
        }
      );
      const token = response.data.data;
      const decoded = jwt.decode(token) as AccessTokenProps;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = moment(decoded.exp * 1000);
      setAuth({
        isLoggedIn: true,
        accessToken: token,
        city: decoded.user.city ?? null
      });
    } finally {
      setLoading(false);
    }
  };

  const facebookLogin = async (facebookResponse: FacebookLoginResponse) => {
    setLoading(true);
    const { accessToken, email, name } = facebookResponse;

    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/api/oauth/facebook",
        {
          email,
          name,
          accessToken
        }
      );
      const token = response.data.data;
      const decoded = jwt.decode(token) as AccessTokenProps;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = moment(decoded.exp * 1000);
      setAuth({
        isLoggedIn: true,
        accessToken: token,
        city: decoded.user.city ?? null
      });
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
