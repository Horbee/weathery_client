import { axiosInstance } from "../service/axios/axiosIstance";
import { AuthResponse } from "./models/AuthResponse";

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });

  return data;
};

export const signupWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>("/api/auth", {
    email,
    password,
    name,
  });

  return data;
};

export const forgotpasswordRequest = async (
  email: string
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    "/api/auth/forgotpassword",
    {
      email,
    }
  );
  return data;
};

export const passwordResetRequest = async (
  password: string,
  token: string
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    `/api/auth/resetpassword?token=${token}`,
    { password }
  );
  return data;
};

export const loginWithGoogle = async (
  name: string,
  email: string,
  idToken: string
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>("/api/oauth/google", {
    email,
    name,
    idToken,
  });

  return data;
};

export const loginWithFacebook = async (
  name: string,
  email: string,
  accessToken: string
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    "/api/oauth/facebook",
    {
      email,
      name,
      accessToken,
    }
  );

  return data;
};
