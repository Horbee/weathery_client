import axios from "axios";
import { useEffect, useState } from "react";

import { Nullable } from "../models/Nullable";

type Status = "UP" | "DOWN" | "PENDING";

export const useWeatherService = () => {
  const [status, setStatus] = useState<Nullable<boolean>>(null);
  const [loading, setLoading] = useState(false);

  const checkBackendStatus = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const response = await axios.get<{ status: Status }>("/health");
      if (response.data.status === "UP") {
        setStatus(true);
      }
    } catch (err) {
      setStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const backendState: Status = status
    ? "UP"
    : status === null
    ? "PENDING"
    : "DOWN";

  return { checkBackendStatus, loading, backendState };
};
