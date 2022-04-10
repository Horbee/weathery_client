import { isFuture } from "date-fns";
import jwt_decode from "jwt-decode";
import { createContext, FC, useEffect, useState } from "react";


import {
    forgotpasswordRequest, loginWithEmailAndPassword, loginWithFacebook, loginWithGoogle,
    passwordResetRequest, signupWithEmailAndPassword
} from "../../api/auth-controller";
import { City } from "../../api/models/CitySearchResponse";
import { AccessTokenProps } from "../../api/models/TokenResponse";
import { CITYSEARCH } from "../../constants/localstorage";
import { LoadingWrapper } from "../../custom-components/LoadingWrapper";
import { Nullable } from "../../utils/Nullable";
import { createSuccessToast } from "../../utils/toast/successToast";
import { TypedStorage } from "../../utils/typedStorage";

type AuthServiceContextType = {
  auth: UserData;
  login: (email: string, password: string) => Promise<void>;
  facebookLogin: (facebookLoginResponse: any) => Promise<void>;
  clearAuth: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<boolean>;
  setupAuth: (token: string) => void;
  checkInitialAuthState: boolean;
  loading: boolean;
};

interface UserData {
  accessToken: string;
  isLoggedIn: boolean;
  city: Nullable<City>;
}

const initialAuthState = {
  accessToken: "",
  isLoggedIn: false,
  city: null,
};

export const AuthServiceContext = createContext<AuthServiceContextType>(
  undefined as any
);

export const AuthServiceProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [checkInitialAuthState, setCheckInitialAuthState] = useState(true);
  const [auth, setAuth] = useState<UserData>(initialAuthState);

  useEffect(() => {
    checkAuthState();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const {
        data: { token },
      } = await loginWithEmailAndPassword(email, password);
      const decoded = jwt_decode(token) as AccessTokenProps;
      TypedStorage.username = email;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = new Date(decoded.exp * 1000);
      setAuth({
        isLoggedIn: true,
        accessToken: token,
        city: decoded.user.city ?? null,
      });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      const {
        data: { token },
      } = await signupWithEmailAndPassword(name, email, password);
      const decoded = jwt_decode(token) as AccessTokenProps;
      TypedStorage.username = email;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = new Date(decoded.exp * 1000);
      setAuth({ isLoggedIn: true, accessToken: token, city: null });
    } finally {
      setLoading(false);
    }
  };

  const checkAuthState = () => {
    setCheckInitialAuthState(true);

    const accessToken = TypedStorage.accessToken;
    const tokenExpirationDate = TypedStorage.tokenExpirationDate;

    if (accessToken) {
      if (tokenExpirationDate && isFuture(tokenExpirationDate)) {
        const decoded = jwt_decode(accessToken) as AccessTokenProps;
        setAuth({
          isLoggedIn: true,
          accessToken,
          city: decoded?.user?.city ?? null,
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
      const { data: message } = await forgotpasswordRequest(email);
      createSuccessToast(message);
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
      const { data: message } = await passwordResetRequest(password, token);
      createSuccessToast(message);
      return true;
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const facebookLogin = async (
    facebookResponse: any /*FacebookLoginResponse*/
  ) => {
    setLoading(true);
    const { accessToken, email, name } = facebookResponse;

    try {
      const {
        data: { token },
      } = await loginWithFacebook(name, email, accessToken);
      const decoded = jwt_decode(token) as AccessTokenProps;
      TypedStorage.accessToken = token;
      TypedStorage.tokenExpirationDate = new Date(decoded.exp * 1000);
      setAuth({
        isLoggedIn: true,
        accessToken: token,
        city: decoded.user.city ?? null,
      });
    } finally {
      setLoading(false);
    }
  };

  const setupAuth = (token: string) => {
    const decoded = jwt_decode(token) as AccessTokenProps;
    TypedStorage.accessToken = token;
    TypedStorage.tokenExpirationDate = new Date(decoded.exp * 1000);
    setAuth({
      isLoggedIn: true,
      accessToken: token,
      city: decoded.user.city ?? null,
    });
  };

  return (
    <AuthServiceContext.Provider
      value={{
        auth,
        login,
        facebookLogin,
        clearAuth,
        signup,
        forgotPassword,
        resetPassword,
        setupAuth,
        checkInitialAuthState,
        loading,
      }}
    >
      <LoadingWrapper loading={checkInitialAuthState}>
        {children}
      </LoadingWrapper>
    </AuthServiceContext.Provider>
  );
};
