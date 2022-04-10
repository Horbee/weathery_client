import { axiosInstance } from "../service/axios/axiosIstance";
import { ApiResponse } from "./models/ApiResponse";
import { AuthResponse } from "./models/AuthResponse";

// TODO: integrate OpenAPI generator

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<ApiResponse<AuthResponse>> => {
  const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>(
    "/api/auth/local",
    {
      email,
      password,
    }
  );

  return data;
};

export const signupWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<ApiResponse<AuthResponse>> => {
  const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>(
    "/api/auth/local/create",
    {
      email,
      password,
      name,
    }
  );

  return data;
};

export const forgotpasswordRequest = async (
  email: string
): Promise<ApiResponse<string>> => {
  const { data } = await axiosInstance.post<ApiResponse<string>>(
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
): Promise<ApiResponse<string>> => {
  const { data } = await axiosInstance.post<ApiResponse<string>>(
    `/api/auth/resetpassword?token=${token}`,
    { password }
  );
  return data;
};

export const loginWithGoogle = async (
  params: any
): Promise<ApiResponse<AuthResponse>> => {
  const { data } = await axiosInstance.get<ApiResponse<AuthResponse>>(
    "/api/auth/google/callback",
    { params }
  );

  return data;
};

export const loginWithFacebook = async (
  params: any
): Promise<ApiResponse<AuthResponse>> => {
  const { data } = await axiosInstance.get<ApiResponse<AuthResponse>>(
    "/api/auth/facebook/callback",
    { params }
  );

  return data;
};
