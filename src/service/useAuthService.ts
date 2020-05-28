import axios from "axios";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

import { Nullable } from "../models/Nullable";

interface UserData {
  token: string;
}

interface AuthResponse {
  success: boolean;
  data: string;
}

export const useAuthService = () => {
  const [, setUser] = useState<Nullable<UserData>>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await axios.post<AuthResponse>("/api/auth/login", {
        email,
        password
      });
      const token = response.data.data;
      setUser({ token });
      console.log(token);
    } catch (err) {
      console.log({ err });
      if (err.response.data.success === false) {
        err.response.data.error.forEach((msg: string) => {
          toast.error(msg, {
            transition: Slide,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined
          });
        });
      }
    }

    setLoading(false);
  };

  return { login, loading };
};
